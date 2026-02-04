BUILD_ENV = BUILDX_NO_DEFAULT_ATTESTATIONS=1 COMPOSE_PARALLEL_LIMIT=5 # Optimized build env: No metadata, parallel builds enabled
DOCKER_COMPOSE = docker compose
ENV_FILENAME ?= .env
ESLINT = npx eslint
FORMAT_SRC_FILES = **/*.{ts,tsx,js,scss,html,md,json}
HUSKY = npx husky
LINT_SRC_FILES = .
PACKAGE_MANAGER = yarn
PRETTIER = npx prettier
SHELL := /bin/bash
VITEST = npx vitest

## --- Help System ---

.PHONY: help create-env delete-env

help: ## Show this help message
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

create-env: # Combine .env.example and .env.local into .env
	@cat .env.example > $(ENV_FILENAME)

delete-env: # Remove the generated .env file
	@rm -f $(ENV_FILENAME)

ensure-node-modules: # Ensure the node_modules exists
	@test -d node_modules || $(MAKE) setup

## --- Setup and Installation ---

.PHONY: help setup install install-hooks clean

setup: ## Full project setup (install deps and git hooks)
	source ~/.nvm/nvm.sh && nvm use
	yarn cache clean
	$(MAKE) install
	$(MAKE) install-hooks

install: ## Install project dependencies using Yarn
	$(PACKAGE_MANAGER) install

install-hooks: ## Initialize Husky git hooks
	@test -d .husky || $(HUSKY) init

clean: ## Remove build artifacts, coverage, and node_modules
	rm -rf $(ENV_FILENAME) coverage node_modules package-lock.json

## --- Testing ---

.PHONY: test test-watch code-coverage

test: ## Run unit tests once
	$(MAKE) ensure-node-modules
	$(VITEST) run

code-coverage: ## Run tests and generate coverage report
	$(MAKE) ensure-node-modules
	$(VITEST) run --coverage

## --- Linting & Formatting ---

.PHONY: lint lint-fix format format-fix tidy

lint: ## Check source files for linting errors
	$(MAKE) ensure-node-modules
	$(ESLINT) $(LINT_SRC_FILES)

lint-fix: ## Automatically fix linting errors
	$(MAKE) ensure-node-modules
	$(ESLINT) $(LINT_SRC_FILES) --fix

format: ## Check if files follow Prettier formatting rules
	$(MAKE) ensure-node-modules
	$(PRETTIER) --check $(FORMAT_SRC_FILES)

format-fix: ## Automatically format files with Prettier
	$(MAKE) ensure-node-modules
	$(PRETTIER) --write $(FORMAT_SRC_FILES)

tidy: ## Run both lint-fix and format-fix (Auto-clean)
	$(MAKE) lint-fix
	$(MAKE) format-fix

## --- Hygiene & Analysis ---

.PHONY: precommit type-check knip ci

precommit: ## Run linting and formatting on staged files (for git hooks)
	$(MAKE) ensure-node-modules
	npx lint-staged

type-check:	 ## Run TypeScript type checking
	$(MAKE) ensure-node-modules
	npx tsc --noEmit

knip: ## Run Knip to find unused files, dependencies, and exports
	$(MAKE) ensure-node-modules
	npx knip

ci: ## Run all local CI checks (lint, format, types, tests)
	$(MAKE) lint
	$(MAKE) format
	$(MAKE) test
	$(MAKE) code-coverage
	$(MAKE) type-check
	$(MAKE) knip

## --- Docker Management ---

.PHONY: docker-start docker-refresh docker-stop docker-down docker-status docker-logs docker-reset

docker-start: ## Build and start all containers
	@if [ ! -f $(ENV_FILENAME) ]; then $(MAKE) create-env; fi
	$(BUILD_ENV) $(DOCKER_COMPOSE) up --build -d --remove-orphans

docker-refresh: ## Rebuild and restart all containers (use when .env changes)
	@if [ ! -f $(ENV_FILENAME) ]; then $(MAKE) create-env; fi
	$(BUILD_ENV) $(DOCKER_COMPOSE) up --build -d --force-recreate --no-deps

docker-stop: ## Stop all running containers
	@if [ -z "$$($(DOCKER_COMPOSE) ps -q)" ]; then \
		printf "\033[33m⚠️  App is already stopped.\033[0m\n"; \
	else \
		$(DOCKER_COMPOSE) stop; \
	fi

docker-down: ## Stop and remove containers, networks, and orphans
	$(DOCKER_COMPOSE) down --remove-orphans

docker-status: ## Show status of all containers
	@if [ -z "$$($(DOCKER_COMPOSE) ps -q)" ]; then \
		printf "\033[33m⚠️  No containers running.\033[0m\n"; \
	else \
		$(DOCKER_COMPOSE) ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"; \
	fi

docker-logs: ## Tail logs from all containers
	@if [ -z "$$($(DOCKER_COMPOSE) ps --services --filter "status=running" 2>/dev/null)" ]; then \
		printf "\033[33m⚠️  App is not running. Use 'make docker-start' to start it.\033[0m\n"; \
	else \
		$(DOCKER_COMPOSE) logs -f; \
	fi

docker-reset: ## NUCLEAR OPTION: Wipes Images, Volumes (DB Data), and Cache
	@if [ ! -f $(ENV_FILENAME) ]; then $(MAKE) create-env; fi
	$(DOCKER_COMPOSE) down -v --rmi all --volumes --remove-orphans
	docker system prune -f
	docker volume prune -f
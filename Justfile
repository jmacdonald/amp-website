compose := "docker compose"

setup:
    {{compose}} build
    # Dependencies are installed in the node_modules Docker volume. The project uses
    # npm ci --ignore-scripts because Chromium is supplied by the Docker image.
    {{compose}} run --rm setup

serve:
    {{compose}} up dev

build:
    {{compose}} run --rm build

capture:
    {{compose}} run --rm capture

verify: build capture

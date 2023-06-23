# JupyterLab Quarto Extension

[Quarto](https://www.quarto.org) is an open source project that combines Jupyter notebooks with flexible options to use a single source document to produce high-quality articles, reports, presentations, websites, and books in HTML, PDF, MS Word, ePub, and more. Quarto supports a wide variety of useful new features useful in technical documents, including support for LaTeX equations, citations, cross-references, figure panels, callouts, advanced page layout, and more.

The JupyterLab Quarto extension allows JupyterLab to render notebooks which include Quarto markdown content.
<br/><br/>

<p align="center">
<img src="https://user-images.githubusercontent.com/261654/230087634-d5027ebc-8508-43b4-81c9-c4b7d6cfa738.png" width="60%">
</p>

### Binder

You can try an example of the extension in a notebook (though you can't actually render the notebook using Quarto) on Binder.

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/quarto-dev/jupyterlab-quarto/main?urlpath=lab)

## Status

[![Github Actions Status](https://github.com/quarto-dev/jupyterlab-quarto/workflows/Build/badge.svg)](https://github.com/quarto-dev/jupyterlab-quarto/actions/workflows/build.yml)

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_quarto
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_quarto
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_quarto directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_quarto
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `@quarto/jupyterlab-quarto` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)

# Making a new release of jupyterlab_quarto

The extension can be published to `PyPI` and `npm` manually or using the [Jupyter Releaser](https://github.com/jupyter-server/jupyter_releaser).

## Manual release

### Python package

This extension can be distributed as Python packages. All of the Python
packaging instructions are in the `pyproject.toml` file to wrap your extension in a
Python package. Before generating a package, you first need to install some tools:

```bash
pip install build twine hatch
```

Bump the version using `hatch`. By default this will create a tag.
See the docs on [hatch-nodejs-version](https://github.com/agoose77/hatch-nodejs-version#semver) for details.

```bash
hatch version <new-version>
```

**Before building, note that you must temporarily update the `package.json` file to remove the `@quarto` prefix from the package name.**

To create a Python source package (`.tar.gz`) and the binary package (`.whl`) in the `dist/` directory, do:

```bash
jlpm clean:all && git clean -dfX
sed -i '' 's/"@quarto\/jupyterlab-quarto"/"jupyterlab-quarto"/g' package.json
jlpm && jlpm build:prod
python -m build
twine upload dist/*
sed -i '' 's/"jupyterlab-quarto"/"@quarto\/jupyterlab-quarto"/g' package.json
jlpm
```

> `python setup.py sdist bdist_wheel` is deprecated and will not work for this package.

### NPM package

To publish the frontend part of the extension as a NPM package, do:

```bash
jlpm clean:all && git clean -dfX
jlpm && jlpm build:prod
npm login
npm publish --access public
```

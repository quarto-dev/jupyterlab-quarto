/*
 * hooks.ts
 *
 * Copyright (C) 2020-2023 Posit Software, PBC
 *
 */

import { Hook } from '../types';
import { IEditorLanguageRegistry } from '@jupyterlab/codemirror';

export function codeMirrorPreloadHook(
  registry: IEditorLanguageRegistry
): Hook<string, string> {
  // TODO: Properly deal with {r}, {{r}} style expressions
  const fenced = new RegExp(/^`{3}([^\s]+)/g);

  return {
    run: async source => {
      const newModes = new Map<string, Promise<any>>();
      let match: RegExpMatchArray | null;
      while ((match = fenced.exec(source))) {
        if (!newModes.has(match[1])) {
          newModes.set(match[1], registry.getLanguage(match[1]));
        }
      }
      if (newModes.size) {
        Promise.all(newModes.values()).catch(console.warn);
      }
      return source;
    }
  };
}

export const codeMirrorHighlighter = (
  languageRegistry: IEditorLanguageRegistry
) => {
  return (str: string, lang: string, _attr: any) => {
    if (!lang) {
      return ''; // use external default escaping
    }
    try {
      const spec = languageRegistry.findBest(lang);
      if (!spec) {
        console.warn(`No CodeMirror mode: ${lang}`);
        return '';
      }

      const el = document.createElement('div');
      try {
        languageRegistry.highlight(str, spec, el);
        return el.innerHTML;
      } catch (err) {
        console.warn(`Failed to highlight ${lang} code`, err);
      }
    } catch (err) {
      console.warn(`No CodeMirror mode: ${lang}`);
      console.warn(`Require CodeMirror mode error: ${err}`);
    }
    return '';
  };
};

export const codeMirrorHighlight = (
  str: string,
  lang: string,
  registry: IEditorLanguageRegistry
) => {
  if (!lang) {
    return ''; // use external default escaping
  }
  try {
    const spec = registry.findBest(lang);
    if (!spec) {
      console.warn(`No CodeMirror mode: ${lang}`);
      return '';
    }

    const el = document.createElement('div');
    try {
      registry.highlight(str, spec, el);
      return el.innerHTML;
    } catch (err) {
      console.warn(`Failed to highlight ${lang} code`, err);
    }
  } catch (err) {
    console.warn(`No CodeMirror mode: ${lang}`);
    console.warn(`Require CodeMirror mode error: ${err}`);
  }
  return '';
};

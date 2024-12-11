/*
 * math.ts
 *
 * Copyright (C) 2020-2023 Posit Software, PBC
 *
 */
import { mathjaxPlugin } from '../plugins/math';
import { markdownItExtension } from './provider';

export const math = markdownItExtension({
  id: '@quarto/math',
  title: 'LaTex Math',
  plugin: async () => {
    return [mathjaxPlugin];
  },
  hooks: {
    postRender: {
      run: (node: HTMLElement) => {
        // Inject mathjax
        const mathjaxId = 'MathJax-script';
        const mathJaxScript = document.getElementById(mathjaxId);
        if (!mathJaxScript) {
          const configEl = document.createElement('script');
          configEl.innerText = `

MathJax = {
  svg: {
    fontCache: 'global'
  },
  startup: {
    typeset: false,
    pageReady: () => {
      MathJax.startup.promise.then(() => {

        const typesetMath = (els) => {
          MathJax.startup.promise = MathJax.startup.promise
            .then(() => {
              return MathJax.typesetPromise(els); }
            )
            .catch((err) => console.log('Typeset failed: ' + err.message));
          return MathJax.startup.promise;
        };

        const containerObserver = new MutationObserver((mutationList, observer) => { 
          const markdownNodes = [];
          mutationList.forEach((record) => {
            for (const node of record.addedNodes) {
              if(node.querySelectorAll){
                markdownNodes.push(...node.querySelectorAll('.quarto-inline-math, .quarto-display-math'));
              }
            }
          });
          typesetMath(markdownNodes);
        });

        const nbContainer = document.querySelector('.jp-Notebook');
        if (nbContainer !== null) {
          containerObserver.observe(nbContainer, { childList: true, subtree: true });
        }

        const mathEls = document.body.querySelectorAll('.quarto-inline-math, .quarto-display-math');
        return typesetMath([...mathEls]);
      });
    },
  }
};`;
          document.head.appendChild(configEl);

          const polyFillEl = document.createElement('script');
          polyFillEl.setAttribute(
            'src',
            'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=es6'
          );
          document.head.appendChild(polyFillEl);

          const scriptEl = document.createElement('script');
          scriptEl.id = mathjaxId;
          scriptEl.setAttribute(
            'src',
            'https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js'
          );
          document.head.appendChild(scriptEl);
        }

        return Promise.resolve();
      }
    }
  }
});

/*
<script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

*/

import ResizeObserver from "resize-observer-polyfill";
import type { BasicTarget } from "ahooks/es/utils/domTarget";
import { getTargetElement } from "ahooks/es/utils/domTarget";
import useIsomorphicLayoutEffectWithTarget from "ahooks/es/utils/useIsomorphicLayoutEffectWithTarget";

type Size = { width: number; height: number };

type SizeChangeFn = (size:Size) => void;

function useSizeEvt(target: BasicTarget, fn: SizeChangeFn){
  
  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          fn({ width: clientWidth, height: clientHeight });
        });
      });
      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [fn],
    target
  );
}

export default useSizeEvt;

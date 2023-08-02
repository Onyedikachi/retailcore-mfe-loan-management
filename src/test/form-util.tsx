import { isNullish } from '@app/helper';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';

type TestMeta = {
   testDescription: string;
   selector: string;
   expectedText?: string;
   expectedInputValue?: string | number;
   expectedTextLength?: number;
   expectedClass?: string;
   buttonStatus?: {
      selector: string;
      disabled?: boolean;
   };
   acts: Array<{
      click?: boolean;
      typeText?: string;
      blur?: boolean;
      focus?: boolean;
      selector?: string;
      clear?: boolean;
      mousedown?: boolean;
   }>;
};

const findQueryElement = (screen: any, selector: string) => {
   const queryElement = screen.container.querySelector(selector);
   if (!queryElement) {
      throw Error(`Can't find query element with selector ${selector}.`);
   }
   return queryElement;
};

const performActions = async (acts: TestMeta['acts'], elementSelector: string, screen: any) => {
   const user = userEvent.setup();
   for (const { click, typeText, blur, focus, selector: actSelector, clear, mousedown } of acts) {
      const actElement = actSelector
         ? findQueryElement(screen, actSelector)
         : findQueryElement(screen, elementSelector);

      if (!actElement) {
         throw Error(`Can't find query element with selector ${actSelector}.`);
      }

      await act(async () => {
         if (focus) fireEvent.focus(actElement);
         if (blur) fireEvent.blur(actElement);
         if (typeText) await user.type(actElement, typeText);
         if (click) fireEvent.click(actElement);
         if (clear) await user.clear(actElement);
         if (mousedown) fireEvent.mouseDown(actElement);
      });
   }
};

const testForm = (
   component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
   testMeta: TestMeta
) => {
   it(testMeta.testDescription, async () => {
      const screen = render(component);
      const queryElement = findQueryElement(screen, testMeta.selector);

      await performActions(testMeta.acts, testMeta.selector, screen);

      if (testMeta.expectedText) {
         expect(screen.baseElement).toHaveTextContent(testMeta.expectedText);
      }

      if (!isNullish(testMeta.expectedInputValue)) {
         expect((queryElement as HTMLInputElement).value).toBe(testMeta.expectedInputValue);
      }

      if (!isNullish(testMeta.expectedTextLength)) {
         expect((queryElement as HTMLInputElement).value).toHaveLength(testMeta.expectedTextLength!);
      }

      if (testMeta.expectedClass) {
         expect(queryElement?.classList.toString()).toContain(testMeta.expectedClass);
      }

      if (testMeta.buttonStatus) {
         const buttonElement = screen.container.querySelector(testMeta.buttonStatus.selector);
         expect((buttonElement as HTMLButtonElement).disabled).toBe(!!testMeta.buttonStatus.disabled);
      }
   });
};

export const formTestUtil =
   (component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
   (testMeta: Array<TestMeta>) => {
      testMeta.forEach((meta) => testForm(component, meta));
   };

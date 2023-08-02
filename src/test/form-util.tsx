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

export const formTestUtil =
   (component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
   (testMeta: Array<TestMeta>) => {
      testMeta.forEach(
         ({
            testDescription,
            expectedText,
            selector,
            buttonStatus,
            expectedClass,
            acts,
            expectedTextLength,
            expectedInputValue,
         }) => {
            it(testDescription, async () => {
               const user = userEvent.setup();

               const screen = render(component);

               const queryElement = screen.container.querySelector(selector);
               if (!queryElement) {
                  throw Error(`Can't find query element with selector ${selector}.`);
               }
               // Fire all actions for this test case
               for (const { click, typeText, blur, focus, selector: actSelector, clear, mousedown } of acts) {
                  const actElement = actSelector ? screen.container.querySelector(actSelector) : queryElement;

                  if (!actElement) {
                     throw Error(`Can't find query element with selector ${actSelector}.`);
                  }

                  await act(async () => {
                     if (focus) fireEvent.focus(actElement);
                     if (blur) fireEvent.blur(actElement);
                     if (!isNullish(typeText)) await user.type(actElement, typeText!);
                     if (click) fireEvent.click(actElement);
                     if (clear) await user.clear(actElement);
                     if (mousedown) fireEvent.mouseDown(actElement);
                  });
               }

               if (expectedText) {
                  expect(screen.baseElement).toHaveTextContent(expectedText);
               }

               if (!isNullish(expectedInputValue)) {
                  expect((queryElement as HTMLInputElement).value).toBe(expectedInputValue);
               }

               if (!isNullish(expectedTextLength)) {
                  expect((queryElement as HTMLInputElement).value).toHaveLength(expectedTextLength!);
               }

               if (expectedClass) {
                  expect(queryElement?.classList.toString()).toContain(expectedClass);
               }

               if (buttonStatus) {
                  const buttonElement = screen.container.querySelector(buttonStatus.selector);
                  expect((buttonElement as HTMLButtonElement).disabled).toBe(!!buttonStatus.disabled);
               }
            });
         }
      );
   };

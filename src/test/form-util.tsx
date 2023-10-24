import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';
import { isNullish } from '@app/helper';

type TestExpectations = {
   /** Text that is expected to be present in the DOM. */
   expectedText?: string;
   /** Text that is expected not to be present in the DOM. */
   expectedNotText?: string;
   /**
    * Selector of the element that is expected to have been checked. If `true` check the element
    * gotten from the `selector` prop if checked & if `false` checked the element is not checked.
    */
   expectedChecked?: string | boolean;
   /**
    * Selector of the element that is expected to not be checked. If `true` check the element
    * gotten from the `selector` prop if not checked & if `false` checked the element is checked.
    */
   expectedNotChecked?: string | boolean;
   /**
    * Selector of the element that is expected to be in the DOM. If `true` expect the element
    * gotten from the `selector` prop to be in DOM & if `false` expect the element not to be in DOM.
    */
   expectedInDOM?: string | boolean;
   /**
    * Selector of the element that is expected not to be in the DOM. If `true` expect the element
    * gotten from the `selector` prop not to be in DOM & if `false` expect the element to be in DOM.
    */
   expectedNotInDOM?: string | boolean;
   expectedInputValue?: string | number;
   expectedTextLength?: number;
   expectedClass?: string;
};

type TestMeta = {
   testDescription: string;
   selector: string;
   buttonStatus?: {
      selector: string;
      disabled?: boolean;
   };
   acts: Array<
      {
         click?: boolean;
         typeText?: string;
         blur?: boolean;
         focus?: boolean;
         selector?: string;
         clear?: boolean;
         mousedown?: boolean;
      } & TestExpectations
   >;
} & TestExpectations;

const findQueryElement = (screen: any, selector: string) => {
   const queryElement = screen.container.querySelector(selector);
   if (!queryElement) {
      throw Error(`Can't find query element with selector ${selector}.`);
   }
   return queryElement;
};

const performActions = async (acts: TestMeta['acts'], elementSelector: string, screen: any) => {
   for (const act of acts) {
      const actElement = act.selector
         ? findQueryElement(screen, act.selector)
         : findQueryElement(screen, elementSelector);
      if (!actElement) {
         throw Error(`Can't find query element with selector ${act.selector}.`);
      }
      await triggerEvent(act, actElement, screen);
   }
};

const triggerEvent = async (acts: TestMeta['acts'][0], actElement: any, screen: any) => {
   const actsKeys = Object.keys(acts) as Array<keyof typeof acts>;
   const user = userEvent.setup();
   await act(async () => {
      for (const actKey of actsKeys) {
         if (actKey === 'focus' && acts[actKey]) fireEvent.focus(actElement);
         if (actKey === 'blur' && acts[actKey]) fireEvent.blur(actElement);
         if (actKey === 'typeText' && acts[actKey]) await user.type(actElement, acts[actKey] ?? '');
         if (actKey === 'click' && acts[actKey]) fireEvent.click(actElement);
         if (actKey === 'clear' && acts[actKey]) await user.clear(actElement);
         if (actKey === 'mousedown' && acts[actKey]) fireEvent.mouseDown(actElement);
      }
   });

   checkExpectations(screen.baseElement, actElement, acts, screen);
};

const testForm = (
   component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
   testMeta: TestMeta
) => {
   it(testMeta.testDescription, async () => {
      const screen = render(component);
      await performActions(testMeta.acts, testMeta.selector, screen);
      const queryElement = findQueryElement(screen, testMeta.selector);
      checkExpectations(screen.baseElement, queryElement, testMeta, screen);
      const { buttonStatus } = testMeta;
      if (buttonStatus) {
         const buttonElement = screen.container.querySelector(buttonStatus.selector);
         expect((buttonElement as HTMLButtonElement).disabled).toBe(buttonStatus.disabled);
      }
   });
};

const checkExpectations = (
   baseElement: HTMLElement,
   expectedElement: HTMLElement,
   expectation: TestExpectations,
   screen: any
) => {
   if (expectation.expectedText) {
      expect(baseElement).toHaveTextContent(expectation.expectedText);
   }
   if (expectation.expectedNotText) {
      expect(baseElement).not.toHaveTextContent(expectation.expectedNotText);
   }
   if (!isNullish(expectation.expectedInputValue)) {
      expect((expectedElement as HTMLInputElement).value).toBe(expectation.expectedInputValue);
   }
   if (!isNullish(expectation.expectedTextLength)) {
      expect((expectedElement as HTMLInputElement).value).toHaveLength(expectation.expectedTextLength!);
   }
   if (expectation.expectedClass) {
      expect(expectedElement).toHaveClass(expectation.expectedClass);
   }
   if (!isNullish(expectation.expectedChecked)) {
      const checkElement = getExpectedElement(screen, expectedElement, expectation.expectedChecked!);
      expect((checkElement as HTMLInputElement).checked).toBe(!!expectation.expectedChecked);
   }
   if (!isNullish(expectation.expectedNotChecked)) {
      const checkElement = getExpectedElement(screen, expectedElement, expectation.expectedNotChecked!);
      expect((checkElement as HTMLInputElement).checked).toBe(!expectation.expectedNotChecked);
   }
   if (!isNullish(expectation.expectedInDOM)) {
      const element = getExpectedElement(screen, expectedElement, expectation.expectedInDOM!);
      expectation.expectedInDOM ? expect(element).toBeInTheDocument() : expect(element).toBeNull();
   }
   if (!isNullish(expectation.expectedNotInDOM)) {
      const element = getExpectedElement(screen, expectedElement, expectation.expectedNotInDOM!);
      expectation.expectedNotInDOM ? expect(element).toBeNull() : expect(element).toBeInTheDocument();
   }
};

const getExpectedElement = (screen: any, component: HTMLElement, expectation: string | boolean) => {
   if (typeof expectation === 'boolean') return component;
   return findQueryElement(screen, expectation);
};

export const formTestUtil =
   (component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
   (testMeta: Array<TestMeta>) => {
      testMeta.forEach((meta) => testForm(component, meta));
   };

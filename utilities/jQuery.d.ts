// ------------------------------------------------------------
// Lightweight jQuery Type Definitions
// ------------------------------------------------------------

type JQuerySelector = string | Element | Document | Window;

interface JQueryEventHandler {
  (event: Event): void;
}

interface JQuery {
  // ------------------------------------------------------------
  // Selection & Traversal
  // ------------------------------------------------------------

  /**
   * Selects the element at the given index.
   * @param index Zero‑based index of the element to select.
   */
  eq(index: number): this;

  /**
   * Returns the first matched element.
   */
  first(): this;

  /**
   * Returns the last matched element.
   */
  last(): this;

  /**
   * Filters the matched set using a selector or predicate.
   * @param selector A CSS selector or predicate function.
   */
  filter(selector: string | ((index: number, el: Element) => boolean)): this;

  /**
   * Removes elements matching the selector from the set.
   * @param selector Selector identifying elements to exclude.
   */
  not(selector: string): this;

  /**
   * Gets the parent of each element.
   * @param selector Optional selector to filter parents.
   */
  parent(selector?: string): this;

  /**
   * Gets all ancestors of each element.
   * @param selector Optional selector to filter ancestors.
   */
  parents(selector?: string): this;

  /**
   * Gets the children of each element.
   * @param selector Optional selector to filter children.
   */
  children(selector?: string): this;

  /**
   * Finds descendant elements matching the selector.
   * @param selector CSS selector for descendants.
   */
  find(selector: string): this;

  /**
   * Gets siblings of each element.
   * @param selector Optional selector to filter siblings.
   */
  siblings(selector?: string): this;

  /**
   * Gets the next sibling.
   * @param selector Optional selector to filter the next sibling.
   */
  next(selector?: string): this;

  /**
   * Gets the previous sibling.
   * @param selector Optional selector to filter the previous sibling.
   */
  prev(selector?: string): this;

  /**
   * Iterates over matched elements.
   * @param callback Function invoked for each element.
   */
  each(callback: (index: number, element: Element) => void): this;

  // ------------------------------------------------------------
  // CSS / Styling & Dimensions
  // ------------------------------------------------------------

  /**
   * Adds a class to elements.
   * @param name Class name to add.
   */
  addClass(name: string): this;

  /**
   * Removes a class from elements.
   * @param name Class name to remove.
   */
  removeClass(name: string): this;

  /**
   * Toggles a class on elements.
   * @param name Class name to toggle.
   */
  toggleClass(name: string): this;

  /**
   * Checks if elements have a class.
   * @param name Class name to check.
   */
  hasClass(name: string): boolean;

  /**
   * Gets or sets a CSS property.
   * @param name CSS property name.
   * @param value Optional value to set.
   */
  css(name: string): string;
  css(name: string, value: any): this;
  css(props: Record<string, any>): this;

  /**
   * Gets or sets width.
   * @param value Optional width to set.
   */
  width(value?: number): this | number;

  /**
   * Gets or sets height.
   * @param value Optional height to set.
   */
  height(value?: number): this | number;

  innerWidth(): number;
  innerHeight(): number;
  outerWidth(includeMargin?: boolean): number;
  outerHeight(includeMargin?: boolean): number;

  /**
   * Gets element position relative to offset parent.
   */
  position(): { top: number; left: number };

  /**
   * Gets or sets element offset.
   * @param coords Optional offset to set.
   */
  offset(): { top: number; left: number };
  offset(coords: { top: number; left: number }): this;

  // ------------------------------------------------------------
  // DOM Manipulation
  // ------------------------------------------------------------

  /**
   * Gets or sets HTML content.
   * @param content Optional HTML string or callback.
   */
  html(): string;
  html(content: string | ((index: number, old: string) => string)): this;

  /**
   * Gets or sets text content.
   * @param content Optional text or callback.
   */
  text(): string;
  text(content: string | ((index: number, old: string) => string)): this;

  /**
   * Gets or sets form value.
   * @param value Optional value to set.
   */
  val(): any;
  val(value: any): this;

  /**
   * Gets or sets an attribute.
   * @param name Attribute name.
   * @param value Optional value to set.
   */
  attr(name: string): string | undefined;
  attr(name: string, value: any): this;
  attr(attrs: Record<string, any>): this;

  /**
   * Removes an attribute.
   * @param name Attribute name to remove.
   */
  removeAttr(name: string): this;

  /**
   * Gets or sets a property.
   * @param name Property name.
   * @param value Optional value to set.
   */
  prop(name: string): any;
  prop(name: string, value: any): this;

  /**
   * Removes a property.
   * @param name Property name to remove.
   */
  removeProp(name: string): this;

  /**
   * Gets or sets data-* attributes.
   * @param key Data key.
   * @param value Optional value to set.
   */
  data(key: string): any;
  data(key: string, value: any): this;
  data(obj: Record<string, any>): this;

  /**
   * Inserts content at the end of each element.
   * @param content Content to append.
   */
  append(content: any): this;

  /**
   * Inserts elements into the target.
   * @param target Target selector or element.
   */
  appendTo(target: JQuerySelector): this;

  /**
   * Inserts content at the beginning of each element.
   * @param content Content to prepend.
   */
  prepend(content: any): this;

  /**
   * Inserts elements into the target at the beginning.
   * @param target Target selector or element.
   */
  prependTo(target: JQuerySelector): this;

  /**
   * Inserts content after each element.
   * @param content Content to insert.
   */
  after(content: any): this;

  /**
   * Inserts matched elements after the target.
   * @param target Target selector or element.
   */
  insertAfter(target: JQuerySelector): this;

  /**
   * Inserts content before each element.
   * @param content Content to insert.
   */
  before(content: any): this;

  /**
   * Inserts matched elements before the target.
   * @param target Target selector or element.
   */
  insertBefore(target: JQuerySelector): this;

  /**
   * Removes all child nodes.
   */
  empty(): this;

  /**
   * Removes elements from the DOM.
   * @param selector Optional selector to filter removal.
   */
  remove(selector?: string): this;

  /**
   * Removes elements but keeps data/events.
   * @param selector Optional selector to filter detaching.
   */
  detach(selector?: string): this;

  /**
   * Replaces each element with new content.
   * @param content Content to replace with.
   */
  replaceWith(content: any): this;

  /**
   * Replaces target elements with the matched set.
   * @param target Target selector or element.
   */
  replaceAll(target: JQuerySelector): this;

  /**
   * Wraps each element with HTML.
   * @param html Wrapper HTML.
   */
  wrap(html: string): this;

  /**
   * Wraps all matched elements with HTML.
   * @param html Wrapper HTML.
   */
  wrapAll(html: string): this;

  /**
   * Wraps inner contents with HTML.
   * @param html Wrapper HTML.
   */
  wrapInner(html: string): this;

  /**
   * Removes parents of matched elements.
   */
  unwrap(): this;

  /**
   * Clones matched elements.
   * @param withEvents Optional. Copy events.
   * @param deepWithEvents Optional. Copy events on descendants.
   */
  clone(withEvents?: boolean, deepWithEvents?: boolean): this;

  /**
   * Gets or sets scrollLeft.
   * @param value Optional value to set.
   */
  scrollLeft(value?: number): this | number;

  /**
   * Gets or sets scrollTop.
   * @param value Optional value to set.
   */
  scrollTop(value?: number): this | number;

  // ------------------------------------------------------------
  // Events
  // ------------------------------------------------------------

  /**
   * Binds an event handler.
   * @param event Event name.
   * @param handler Event handler function.
   */
  on(event: string, handler: JQueryEventHandler): this;
  on(event: string, selector: string, handler: JQueryEventHandler): this;

  /**
   * Unbinds an event handler.
   * @param event Event name.
   * @param handler Optional handler to remove.
   */
  off(event: string, handler?: JQueryEventHandler): this;

  /**
   * Binds a one-time event handler.
   * @param event Event name.
   * @param handler Event handler function.
   */
  one(event: string, handler: JQueryEventHandler): this;

  /**
   * Triggers an event.
   * @param event Event name.
   * @param extra Optional additional data.
   */
  trigger(event: string, extra?: any): this;

  /**
   * Triggers handlers without bubbling.
   * @param event Event name.
   * @param extra Optional additional data.
   */
  triggerHandler(event: string, extra?: any): any;

  // Mouse events
  click(handler?: JQueryEventHandler): this;
  dblclick(handler?: JQueryEventHandler): this;
  mouseenter(handler?: JQueryEventHandler): this;
  mouseleave(handler?: JQueryEventHandler): this;
  mousemove(handler?: JQueryEventHandler): this;
  mouseout(handler?: JQueryEventHandler): this;
  mouseover(handler?: JQueryEventHandler): this;
  mousedown(handler?: JQueryEventHandler): this;
  mouseup(handler?: JQueryEventHandler): this;
  hover(enter: JQueryEventHandler, leave: JQueryEventHandler): this;

  // Keyboard events
  keydown(handler?: JQueryEventHandler): this;
  keyup(handler?: JQueryEventHandler): this;
  keypress(handler?: JQueryEventHandler): this;

  // Form events
  submit(handler?: JQueryEventHandler): this;
  change(handler?: JQueryEventHandler): this;
  focus(handler?: JQueryEventHandler): this;
  blur(handler?: JQueryEventHandler): this;
  focusin(handler?: JQueryEventHandler): this;
  focusout(handler?: JQueryEventHandler): this;
  select(handler?: JQueryEventHandler): this;

  // Document / window events
  ready(handler: () => void): this;
  resize(handler?: JQueryEventHandler): this;
  scroll(handler?: JQueryEventHandler): this;

  // ------------------------------------------------------------
  // Animations & Effects
  // ------------------------------------------------------------

  /**
   * Shows the matched elements.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  show(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Hides the matched elements.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  hide(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Toggles visibility of the matched elements.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  toggle(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Fades in the matched elements.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  fadeIn(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Fades out the matched elements.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  fadeOut(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Toggles fading between visible and hidden states.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  fadeToggle(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Fades the matched elements to a specific opacity.
   * @param duration Animation duration.
   * @param opacity Target opacity (0–1).
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  fadeTo(duration: number, opacity: number, easing?: string, complete?: () => void): this;

  /**
   * Slides the matched elements down into view.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  slideDown(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Slides the matched elements up out of view.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  slideUp(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Toggles sliding between visible and hidden states.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  slideToggle(duration?: number, easing?: string, complete?: () => void): this;

  /**
   * Performs a custom animation on numeric CSS properties.
   * @param props Map of CSS properties and target values.
   * @param duration Optional animation duration.
   * @param easing Optional easing function.
   * @param complete Optional callback after completion.
   */
  animate(
    props: Record<string, any>,
    duration?: number,
    easing?: string,
    complete?: () => void
  ): this;

  /**
   * Stops the currently running animation.
   * @param clearQueue Optional. Clear queued animations.
   * @param jumpToEnd Optional. Jump to final state.
   */
  stop(clearQueue?: boolean, jumpToEnd?: boolean): this;

  /**
   * Immediately completes all queued animations.
   */
  finish(): this;

  /**
   * Delays execution of the next animation.
   * @param duration Delay time in milliseconds.
   * @param queueName Optional queue name.
   */
  delay(duration: number, queueName?: string): this;

  /**
   * Clears remaining functions from the animation queue.
   * @param queueName Optional queue name.
   */
  clearQueue(queueName?: string): this;

  /**
   * Gets or sets the animation queue.
   * @param queueName Optional queue name.
   * @param newQueue Optional new queue to set.
   */
  queue(queueName?: string, newQueue?: Function[]): this;

  /**
   * Executes the next function in the animation queue.
   * @param queueName Optional queue name.
   */
  dequeue(queueName?: string): this;
}

// ------------------------------------------------------------
// jQuery Static
// ------------------------------------------------------------

interface JQueryStatic {
  (selector: JQuerySelector): JQuery;

  /**
   * Runs a function when the DOM is ready.
   * @param handler Callback to execute.
   */
  ready(handler: () => void): void;
}

declare const $: JQueryStatic;

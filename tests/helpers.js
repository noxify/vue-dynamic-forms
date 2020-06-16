import { createLocalVue, shallowMount, mount } from '@vue/test-utils';

export const localVue = createLocalVue();

/**
 * Create a new component instance with
 * a provided set of props.
 * @param propsData
 * @returns {Wrapper<Vue>}
 */
export const selectWithProps = (component, propsData = {}) => {
  return shallowMount(component, { propsData });
};

/**
 * Create a new component instance with
 * a provided set of props.
 * @param propsData
 * @returns {Wrapper<Vue>}
 */
export const selectDeepWithProps = (component, propsData = {}) => {
  return mount(component, { propsData });
};

/**
 * Returns a Wrapper with a component.
 * @param props
 * @param options
 * @return {Wrapper<Vue>}
 */
export const mountFormDefault = (component, props = {}, options = {}) => {
  return shallowMount(component, {
    propsData: {
      options: ['one', 'two', 'three'],
      ...props,
    },
    ...options,
  });
};

export default { localVue, selectDeepWithProps };

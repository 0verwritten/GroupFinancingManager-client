import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import AccountPage from '@/views/account/AccountView.vue';


describe('AccountPage', () => {
  it('renders user info and group list correctly', async () => {
    // Mock the injected dependencies
    const mockAccountClient = {
      getUserProfile: vi.fn(() => Promise.resolve({ isOk: () => true, data: { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' } })),
      getGroupsList: vi.fn(() => Promise.resolve({ isOk: () => true, data: [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }] }))
    };
    
    
    // Mount the component with the mock dependencies
    const wrapper = mount(AccountPage, {
      global: {
        provide: {
          accountClient: mockAccountClient
        }
      }
    });
    
// Wait for the data to be fetched
await wrapper.vm.$nextTick();

    
    // Assert that the user info is displayed correctly
    expect(wrapper.find('p').text()).toBe('Name: Loading... Loading...');
    expect(wrapper.find('p:nth-child(2)').text()).toBe('Email: Loading...');
    
    // Assert that the group list is displayed correctly
    let groupLinks = wrapper.findAllComponents({ name: 'TheRoutedButton' });
    await wrapper.vm.$forceUpdate();
    
    expect(groupLinks.length).toBe(0);
    
    // Assert that the "You are not a member of any groups" message is not shown
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('span').text()).toBe("You are not a member of any groups");
    
    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();
    
    
    expect(wrapper.find('p').text()).toBe('Name: John Doe');
    expect(wrapper.find('p:nth-child(2)').text()).toBe('Email: john.doe@example.com');
    
    groupLinks = wrapper.findAllComponents({ name: 'TheRoutedButton' });
    expect(groupLinks.length).toBe(2);
    expect(groupLinks[0].props().to).toEqual({ name: 'group', params: { id: 1 } });
    expect(groupLinks[0].text()).toBe('Group 1');
    expect(groupLinks[1].props().to).toEqual({ name: 'group', params: { id: 2 } });
    expect(groupLinks[1].text()).toBe('Group 2');
  });
});

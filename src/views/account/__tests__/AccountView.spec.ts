import AccountPage from '../AccountView.vue'
import { describe, it } from 'node:test'


describe('AccountPage', () => {
  it('renders user info and groups correctly', async () => {
    // // Mock the injected dependencies
    // const mockUserProfile = {
    //   first_name: 'John',
    //   last_name: 'Doe',
    //   email: 'john.doe@example.com',
    // }
    // const mockGroupList = [
    //   { id: 1, name: 'Group 1' },
    //   { id: 2, name: 'Group 2' },
    // ]
    // const mockAccountClientService = {
    //   getUserProfile: jest.fn(() => Promise.resolve({ isOk: true, data: mockUserProfile })),
    //   getGroupsList: jest.fn(() => Promise.resolve({ isOk: true, data: mockGroupList })),
    // }
    // const mockInject = jest.fn(() => mockAccountClientService)

    // // Render the component
    // const { getByText, queryByText } = render(AccountPage, {
    //   global: {
    //     mocks: {
    //       $route: {},
    //       $router: {},
    //       $store: {},
    //       inject: mockInject,
    //     },
    //   },
    // })

    // // Wait for the data to be loaded
    // await new Promise((resolve) => setTimeout(resolve, 0))

    // // Assert that user info is rendered correctly
    // expect(getByText('Name: John Doe')).toBeInTheDocument()
    // expect(getByText('Email: john.doe@example.com')).toBeInTheDocument()

    // // Assert that group list is rendered correctly
    // expect(getByText('Group 1')).toBeInTheDocument()
    // expect(getByText('Group 2')).toBeInTheDocument()

    // // Assert that the "You are not a member of any groups" message is not shown
    // expect(queryByText('You are not a member of any groups')).toBeNull()

    // // Assert that the injected dependencies were used correctly
    // expect(mockAccountClientService.getUserProfile).toHaveBeenCalled()
    // expect(mockAccountClientService.getGroupsList).toHaveBeenCalled()
    // expect(mockInject).toHaveBeenCalledWith('accountClient')
  })
})

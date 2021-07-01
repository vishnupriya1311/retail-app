import React, { useState } from 'react';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { StyledTable } from '../../styles';
import { MOCK_DATA } from '../../mock';
import { Orders } from '../Orders';
import { 
  StyledUsersPage, 
  StyledUserOrders, 
  StyledUserDetails, 
  StyledBackIcon,
  StyledViewOrdersLink 
} from './styles';

dayjs.extend(CustomParseFormat);

const USERS_COLUMNS = [
  {
    key: 'Full Name',
    title: 'Full Name',
    render: (text, record) => {
      const { firstName, lastName='' } = record;
      return `${firstName} ${lastName}`;
    },
    align: 'center'
  },
  {
    key: 'Email',
    title: 'Email',
    render: (text, record) => {
      const { email } = record;
      return `${email}`;
    },
    align: 'center'
  },
  {
    key: 'Phone',
    title: 'Phone',
    render: (text, record) => {
      const { phone: { number, code='' } } = record;
      return `${code}${number}`;
    },
    align: 'center'
  },
  {
    key: 'Account Since',
    title: 'Account Since',
    render: (text, record) => {
      const { createdAt } = record;
      return dayjs(createdAt, 'YYYY-MM-DDTHH:mm:ssZ[Z]').format('MM-DD-YYYY');
    },
    align: 'center'
  },
  {
    key: 'Total Orders',
    title: 'Total Orders',
    render: (text, record) => {
      const { orders=[] } = record;
      return (
        <div>
          <span>{orders.length}</span>
          <StyledViewOrdersLink type='link'>View</StyledViewOrdersLink>
        </div>
      );
    },
    align: 'center'
  },
  {
    key: 'Reward Points',
    title: 'Reward Points',
    render: (text, record) => {
      const { rewardsPoints=0 } = record;
      return rewardsPoints;
    },
    align: 'center'
  },
];

const calculateRewardPoints = (orders) => {
  let points = 0;
  if(orders.length > 0) {
    orders.forEach(order => {
      const total = Number(Number(order.grandTotal).toFixed());
      points = points + (total >= 50 ? ( total >=100? ((total-100)*2 + 50): (total-50)*1 ): 0)
    })
  }
  return points;
}

const Users = () => {

  const [state, setState] = useState({
    view: 'USERS',
    selectedUser: null,
    selectedUserOrders: []
  });
  const { view, selectedUser, selectedUserOrders } = state;
  const selectedUserName = view === 'ORDERS' ? `${selectedUser.firstName} ${selectedUser.lastName}`: '';

  const mockAllUsers = MOCK_DATA.USERS;
  const mockAllOrders = MOCK_DATA.ORDERS;
  const usersData = mockAllUsers.map(user => {
    const orders = mockAllOrders.filter(order => order.userId === user.id);
    return {
      key: user.id,
      orders,
      rewardsPoints: calculateRewardPoints(orders),
      ...user
    }
  });

  const handleOnViewOrders = (userId) => {
    const filteredUser = mockAllUsers.filter(user => user.id === userId);
    if(filteredUser && filteredUser.length === 1) {
      const orders = mockAllOrders.filter(order => order.userId === userId);
      setState((prevState) => ({
        ...prevState,
        view: 'ORDERS',
        selectedUser: filteredUser[0],
        selectedUserOrders: orders
      }))
    }
  }

  const handleOnBack = () => {
    setState((prevState) => ({
      ...prevState,
      view: 'USERS',
      selectedUser: null,
      selectedUserOrders: []
    }))
  }

  return (
    <StyledUsersPage>
      {
        view === 'USERS' ? (
          <StyledTable 
            dataSource={usersData}
            columns={USERS_COLUMNS}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => handleOnViewOrders(record.id), // click row
              };
            }}
            pagination={usersData.length > 10}
          />
        ): (
          <StyledUserOrders>
            <StyledUserDetails>
              <StyledBackIcon onClick={handleOnBack}>&#8592;</StyledBackIcon> 
              Orders by <b>{selectedUserName}</b>
            </StyledUserDetails>
            <Orders orders={selectedUserOrders} />
          </StyledUserOrders>
        )
      }
      
    </StyledUsersPage>
  )
}

export { Users };
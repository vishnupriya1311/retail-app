import React from 'react';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { StyledTable } from '../../styles';
import { StyledItems, StyledItem } from './styles';

dayjs.extend(CustomParseFormat);

const ORDERS_COLUMNS = [
  {
    key: 'Ordered On',
    title: 'Ordered On',
    render: (text, record) => {
      const { createdAt } = record;
      return dayjs(createdAt, 'YYYY-MM-DDTHH:mm:ssZ[Z]').format('MM-DD-YYYY');
    },
    align: 'center'
  },
  {
    key: 'Item Details',
    title: 'Item Details',
    render: (text, record) => {
      const { items } = record;
      return (
        <StyledItems>
          {
            items.map((item, index) => {
              const { name } = item;
              return (
                <StyledItem>
                  {name} {index === (items.length - 1) ? '': ','}
                </StyledItem>
              )
            })
          }
        </StyledItems>
      );
    },
    align: 'center'
  },
  {
    key: 'Total Price',
    title: 'Total Price',
    render: (text, record) => {
      const { grandTotal } = record;
      return grandTotal;
    },
    align: 'center'
  },
  {
    key: 'Payment Mode',
    title: 'Payment Mode',
    render: (text, record) => {
      const { payment: { mode } } = record;
      return mode;
    },
    align: 'center'
  },
  {
    key: 'Delivered On',
    title: 'Delivered On',
    render: (text, record) => {
      const { delivery: { deliveredOn } } = record;
      return dayjs(deliveredOn, 'YYYY-MM-DDTHH:mm:ssZ[Z]').format('MM-DD-YYYY');
    },
    align: 'center'
  }
];

const Orders = (props) => {
  
  const { orders=[] } = props;

  return (
    <StyledTable 
      dataSource={orders}
      columns={ORDERS_COLUMNS}
      pagination={orders.length > 10}
    />
  )
}

export { Orders };
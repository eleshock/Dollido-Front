import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from "styled-components";

const NewDataGrid = styled(DataGrid)`
  color: white;
  font-size: 1.5rem;
  border: none;
`

export default function ranking() {
  return (
    <div style={{ height: '430px', width: '100%', margin: '20px 0 0 0'}}>
      <NewDataGrid 
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
        sx = {{
        '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '.MuiDataGrid-columnHeaders': {
          fontSize: '2rem',
          backgroundColor: '#1F4078'
        },
        '.MuiDataGrid-footerContainer': {
          display: 'none',
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#5D6BA1",
        }
      }}
        columns={[
          {
            field: 'ranking',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            separator: 'none'
          },
          {
            field: 'nickname',
            width: 400
            // headerAlign: 'center',
          },
          {
            field: 'win',
            width: 150,
            align: 'center',
            headerAlign: 'center',
          },          
          {
            field: 'lose',
            width: 150,
            align: 'center',
            headerAlign: 'center',
          },
          {
            field: 'winRate',
            width: 150,
            align: 'center',
            headerAlign: 'center',
          },
          {
            field: 'tier',
            width: 200,
            align: 'center',
            headerAlign: 'center',
          }
        ]}
        rows={[
          { internalId: 1, ranking: '1', nickname: '나웃는거본사람', win: '103', lose: '10', winRate: '91.15%', tier: '모아이' },
          { internalId: 2, ranking: '2', nickname: 'dongbro', win: '99', lose: '9', winRate: '91.67%', tier: '모아이' },
          { internalId: 3, ranking: '3', nickname: 'salmonsushi', win: '97', lose: '10', winRate: '90.65%', tier: '모아이' },
          { internalId: 4, ranking: '4', nickname: 'yunchan', win: '95', lose: '11', winRate: '89.62%', tier: '돌하르방' },
          { internalId: 5, ranking: '5', nickname: 'coldlee', win: '92', lose: '13', winRate: '87.62%', tier: '돌하르방' },
          { internalId: 6, ranking: '6', nickname: '곱이곱다', win: '88', lose: '12', winRate: '88.00%', tier: '돌하르방' },
          { internalId: 7, ranking: '7', nickname: 'eleshock', win: '87', lose: '14', winRate: '86.14%', tier: '돌하르방' },
          { internalId: 8, ranking: '8', nickname: '정글A반대표', win: '85', lose: '13', winRate: '86.73%', tier: '가오나시' },
          { internalId: 9, ranking: '9', nickname: '광세족발사장', win: '70', lose: '15', winRate: '82.35%', tier: '가오나시' },
          { internalId: 10, ranking: '10', nickname: '전민동불도저', win: '67', lose: '15', winRate: '81.71%', tier: '가오나시' },
          { internalId: 11, ranking: '11', nickname: '매운새우깡', win: '61', lose: '14', winRate: '81.33%', tier: '가오나시' },
          { internalId: 12, ranking: '12', nickname: '아이유콘서트', win: '59', lose: '13', winRate: '81.94%', tier: '가오나시' },
          { internalId: 13, ranking: '13', nickname: 'maskon', win: '50', lose: '18', winRate: '73.53%', tier: '모나리자' },
          { internalId: 14, ranking: '14', nickname: '머리는위드헤어', win: '48', lose: '20', winRate: '70.59%', tier: '모나리자' },
          { internalId: 15, ranking: '15', nickname: '소바공방', win: '40', lose: '11', winRate: '78.43%', tier: '모나리자' },
          { internalId: 16, ranking: '16', nickname: '깨랑까랑별주민', win: '38', lose: '17', winRate: '69.09%', tier: '모나리자' },
          { internalId: 17, ranking: '17', nickname: '오레오레오', win: '33', lose: '15', winRate: '68.75%', tier: '하회탈' },
          { internalId: 18, ranking: '18', nickname: '기숙사곰팡이', win: '32', lose: '21', winRate: '60.38%', tier: '하회탈' },
          { internalId: 19, ranking: '19', nickname: '닉네임추천받음', win: '24', lose: '15', winRate: '61.54%', tier: '하회탈' },
          { internalId: 20, ranking: '20', nickname: '웃으면만원드림', win: '19', lose: '15', winRate: '55.88%', tier: '하회탈' },
          { internalId: 21, ranking: '21', nickname: '정색못하는사람', win: '10', lose: '8', winRate: '55.56%', tier: '하회탈' },
        ]}
        getRowId={(row) => row.internalId}
      />
    </div>
  );
}
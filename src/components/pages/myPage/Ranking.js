import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { alignProperty } from '@mui/material/styles/cssUtils';
import styled from "styled-components";

const NewDataGrid = styled(DataGrid)`
  color: white;
  font-size: 1.5rem;
  border: none;
  font-family: koverwatch;
`

export default function ranking() {
  return (
    <div style={{ height: '600px', width: '100%'}}>
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
        '.MuiDataGrid-virtualScroller': {
          dispaly: 'none',
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
          { internalId: 1, ranking: '1', nickname: '돌리도마스터', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 2, ranking: '2', nickname: 'coldlee', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 3, ranking: '3', nickname: 'salmonsushi', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 4, ranking: '4', nickname: 'yunchan', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 5, ranking: '5', nickname: 'dongbro', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 6, ranking: '6', nickname: '곱이곱다', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 7, ranking: '7', nickname: 'eleshock', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 8, ranking: '8', nickname: '정글A반대표', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 9, ranking: '9', nickname: '광세족발사장', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
          { internalId: 10, ranking: '10', nickname: '전민동불도저', win: '900', lose: '100', winRate: '90%', tier: '모아이' },
        ]}
        getRowId={(row) => row.internalId}
      />
    </div>
  );
}
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'

const GET_COLLEGES = gql`
  query getSchools {
    getSchools {
      name
      program
      degree
      delivery
      tuition
      location
    }
  }
`
const getColleges = ({render}) => <Query query={GET_COLLEGES}>{render}</Query>;

export const SchoolComposer = adopt({
  getColleges,
})
import React from 'react';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import MaterialTable from 'material-table'

import { SchoolComposer } from './graphql/schools'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['A500'],
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    padding: 20,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(24),
  },
})

class Schools extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  state = {
    columns: [
      { title: 'Name', field: 'name', 
        render: rowData => (<div>{rowData.name}</div>),
      },
      { title: 'Program', field: 'program', 
        render: rowData => (<div>{rowData.program}</div>),
      },
      { title: 'Degree', field: 'degree', 
        render: rowData => (<div>{rowData.degree}</div>),
      },
      { title: 'Delivery', field: 'delivery', 
        render: rowData => (<div>{rowData.delivery}</div>),
      },
      { title: 'Tuition', field: 'tuition', 
        render: rowData => (<div>{rowData.tuition}</div>),
      },
      { title: 'Location', field: 'location', 
        render: rowData => (<div>{rowData.location}</div>),
      },
    ]
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <SchoolComposer>
            {({ getColleges }) => {
              const { data, loading } = getColleges;
              if (!loading && data) {
                return (
                  <Grid>
                    <MaterialTable
                      title={'Affordable Online Degrees'}
                      columns={this.state.columns}
                      tableRef={this.tableRef}
                      data={data.getSchools}
                      page={20}
                    />
                  </Grid>
                )
              }
              return (
                <div className={classes.loadingContainer}>
                  <CircularProgress/>
                </div>
              )
            }}
          </SchoolComposer>
        </div> 
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Schools))
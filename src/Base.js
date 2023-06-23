import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Base = ({title, description, children}) => {
  const history = useHistory();

  return (
    <div className='main-division'>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" style={{background: '#2E3B55'}}>
        <Toolbar>
        <Button color="inherit" onClick={()=>history.push(`/`)}>Add User</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={()=>history.push(`/user`)}>Users</Button>
        </Toolbar>
      </AppBar>
    </Box>

    <header>
        <h1>{title}</h1>
    </header>
    <main>
        <h2>{description}</h2>
        <div>{children}</div>
    </main>
    </div>
  )
}

export default Base
import React from 'react'
import { useHistory } from 'react-router-dom'
import Base from '../Base';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Fab, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteForever } from '@mui/icons-material';

const User = ({userData, setUserData}) => {
    const history = useHistory();

    // Delete user

    const deleteUser = async (userId) =>{
        try {
            const res = await fetch(`https://643d2495f0ec48ce90536438.mockapi.io/Users/${userId}`,{
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            const selectUser = userData.filter((user) => user.id !== userId);
            setUserData(selectUser);
            
        } catch (error) {
            
        }

    } 
  return (
    <Base
    title={"Users List"}
    >
    <div className='card-container'>
        {userData.map((user,id)=>(
            <Card sx={{ maxWidth: 345 }} key={user.id} className='card'>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={user.img}
                alt= "Image not available"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mail i'd: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {user.gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {user.age}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
                <Fab aria-label='edit' color='primary' onClick={()=>history.push(`/edit/${user.id}`)} style={{margin: '0 auto', display: 'flex'}}>
                    <EditIcon/>
                </Fab>
              <Fab aria-label='delete' style={{margin: '0 auto', display: 'flex'}} color='error' onClick={()=>deleteUser(user.id)}>
                <DeleteForever/>
              </Fab>
            </CardActions>
          </Card>
        ))}
    </div>
    </Base>
  )
}

export default User
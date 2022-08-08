import React , { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import Tema from '../../../models/Tema';
import './ListaTema.css';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';



function ListaTema() {
    const [temas, setTema] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token');
    let history = useNavigate();

    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado")
            history ("/login")
        }
    }, [token])

    async function getTema() {
        await busca("/temas", setTema, {
            headers: {
                "Authorization": token
            }
        })
    }
    useEffect(()=>{
        getTema()
    },[temas.length])


    return (
        <>
        {
        temas.map(temas =>(
            <Box m={2} >
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tema
                        </Typography>
                        <Typography variant="h5" component="h2">
                           {temas.descricao}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5} >

                            <Link to={'/formulatoTema/${tema.id}'} className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                        Atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to={'/deletar/${tema.id}'} className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" size='small' color="secondary">
                                        Deletar
                                    </Button>
                                </Box>
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        ))
            }
        </>
    );
}


export default ListaTema;
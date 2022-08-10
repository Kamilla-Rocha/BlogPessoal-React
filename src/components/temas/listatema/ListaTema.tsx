import React , { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import Tema from '../../../models/Tema';
import './ListaTema.css';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';



function ListaTema() {
    const [temas, setTemas] = useState<Tema[]>([])
    let history = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado")
            history ("/login")
        }
    }, [token])

    async function getTema() {
        await busca("/temas", setTemas, {
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

                            <Link to={`/formulatoTema/${temas.id}`} className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                        Atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to={`/deletar/${temas.id}`} className="text-decorator-none">
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
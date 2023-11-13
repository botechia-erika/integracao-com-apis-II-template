import React, { useEffect, useState } from "react";
import axios from "axios";
import { ButtonNome, DeleteButton, ButtonContainer, MainContainer, InputContainer, SaveButton, CloseButton } from './style'
import {AiOutlineDelete} from 'react-icons/ai'
import { Input } from "../../Appstyle";
import { BASE_URL } from "../../constants/BASE_URL";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";

export const EditarUsuario = (props) => {
  const [usuario, setUsuario] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editar, setEditar] = useState(false)

// nessa aula refatoracaos sem uso d
  const getDadosUsuario = () => {
    axios
      .get(
        `${BASE_URL}/${props.id}`,
        {
          headers: {
            Authorization: AUTH_TOKEN,
          },
        }
      )
      // res e a resposta que accede a resposta da api para utilizar somente data preciso usar .data
      .then((res) => {
        setUsuario(res.data);
        setEmail(res.data.email);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getDadosUsuario();
  }, []);

  const editaUsuario = async() => {
    const body = {
        name,
        email
      };
      try {
        await axios
        .put(
          `${BASE_URL}/${usuario.id}`,
          body,
          {
            headers: {
              Authorization: AUTH_TOKEN
            }
          }
        );
        getDadosUsuario()
        setEditar(!editar)
     
      } catch (error) {
        console.log(error.response)
        
      }
  }
 
  const deletarUsuario = async() => {
    
    try {
     const deletar = await axios
      .delete(
        `${BASE_URL}/${usuario.id}`,
        {
          headers: {
            Authorization: AUTH_TOKEN
          }
        }
      )
        
      alert('usuario removido com sucesso')
   
      // chama de novo a funcao para atualizar novamente a requisicao
  
      props.getDadosUsuario()
        setEditar(editar)
} catch (error) {
      console.log(error.response)
    }
    
  };


  return (
    <MainContainer>

      {editar ? (
        <InputContainer>
        <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <SaveButton onClick={editaUsuario}>Salvar</SaveButton>
        <CloseButton onClick={() => setEditar(!editar)}>Fechar</CloseButton>
        </InputContainer>
      ) : (
        <ButtonContainer>
          <ButtonNome onClick={() => setEditar(!editar)}>{usuario.name}</ButtonNome>
          <DeleteButton onClick={deletarUsuario}><AiOutlineDelete/></DeleteButton>
        </ButtonContainer>
      )}
    </MainContainer>
  );
};

import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../provider/axios";
import Card from "components/Card/Card"

export default function MuralSindico() {
    const navigate = useNavigate();
    const [form, setForm] = useState([]);
    const handleClick = () => {
   
    };
  
    const handleButtonClick = (route) => {
      navigate(route);
    };
  
    
    return (
        
      <>
      <div className="teste-background">
            <Card 
            name="Washington Venancio"
            cpf="321.123.321-12"
            email="Washingtonbla@hotmail.com"
            time="Liberação: 10/08 até 02/09">
            
            </Card>
          
        </div>
        
        
        
      </>
    );
  }
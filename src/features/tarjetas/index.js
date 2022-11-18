import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card ,Row,Col} from 'antd';
import React, { useEffect, setState, Component, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'; 

import './index.css';

const { Meta } = Card;


const url ='https://g88956766655ff5-iker.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/canasta/'
//const data = []

function App() {

  const [data,setData]=useState([]);
  const [modalInsertar,setModalInsertar]=useState(false);
  const [modalEditar,setModalEditar]=useState(false);
  const [modalEliminar,setModalEliminar]=useState(false);

  const [productoSeleccionado,setProductoSeleccionado]=useState({
    id: '',
    nombre: '',
    precio: '',  
    descripcion: '',
  });

  const handleChange=e=>{
    const {name,value}=e.target;
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(productoSeleccionado);  
  }



  const peticionGet=async()=>{
    await axios.get(url).then(response=>{setData(response.data.items);
    console.log(response.data.items)})
  }

  const peticionPost=async()=>{
    var nuevo_id=data.length+1;
    productoSeleccionado.id=nuevo_id;
    console.log(productoSeleccionado);
    await axios.post(url,productoSeleccionado).then(
      response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
      })

  }

  const peticionPut=async()=>{
    await axios.put(url+productoSeleccionado.id, productoSeleccionado).then(response =>{
      var dataNueva=data;
      dataNueva.map(producto=>{
        if(productoSeleccionado.id===producto.id){
          producto.nombre=productoSeleccionado.nombre;
          producto.precio=productoSeleccionado.precio;
          producto.descripcion=productoSeleccionado.descripcion;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
  
    })
  };

  const peticionDelete =async()=>{
    console.log(productoSeleccionado.id);

    await axios.delete('https://g88956766655ff5-iker.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/canasta/'+productoSeleccionado.id).then(
      response=>{
        setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
        abrirCerrarModalEliminar();
      }
    )

  }


  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{

    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }



const seleccionarProducto=(producto,caso)=>{
  setProductoSeleccionado(producto);
  console.log(productoSeleccionado);
  if(caso==="Editar"){
    abrirCerrarModalEditar();
  }
  else if(caso==="Eliminar"){
    abrirCerrarModalEliminar();
  }

}

  useEffect(()=>{ peticionGet()},[])


return(
  <div className='App'>

    <FileOutlined onClick={()=>{abrirCerrarModalInsertar()}} />
    <div>
      <Row>

        
      {data.map(producto=>{
        return( 

          <Col className="separador"  >
<Card key={producto.id} 
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <EditOutlined key="edit" onClick={()=>seleccionarProducto(producto,'Editar')}  />,
      <EllipsisOutlined key="delete" onClick={()=>seleccionarProducto(producto,'Eliminar')}  />
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={producto.nombre}
      description={producto.precio}
    />
  </Card>
  
  </Col> )
      })}

</Row>
</div>

  <Modal title="Insertar Producto" open={modalInsertar} onOk={()=>{peticionPost()}} onCancel={()=>abrirCerrarModalInsertar()} >
    <div className="form-group">
      <label>ID:</label>
      <br />
      <input type="text" className="form-control" name="id" onChange={handleChange} value={data.length+1} readOnly />
      <br />

      <label>Nombre:</label>
      <br />
      <input type="text" className="form-control" name="nombre" onChange={handleChange} />
      <br />
      <label>Precio:</label>
      <br />
      <input type="text" className="form-control" name="precio" onChange={handleChange} />
      <br />
      <label>Descripcion:</label>
      <br />
      <input type="text" className="form-control" name="descripcion" onChange={handleChange}/>
      <br />
    </div>
  </Modal>



  <Modal title="Editar producto" open={modalEditar} onCancel={()=>abrirCerrarModalEditar()} onOk={()=>{peticionPut()}} >
    <div className="form-group">
      <label>Nombre:</label>
      <br />
      <input type="text" className="form-control" name="nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre} />
      <br />
      <label>Precio:</label>
      <br />
      <input type="text" className="form-control" name="precio" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precio}/>
      <br />
      <label>Descripcion:</label>
      <br />
      <input type="text" className="form-control" name="descripcion"  onChange={handleChange} value={productoSeleccionado && productoSeleccionado.descripcion}/>
      <br />
    </div>
  </Modal>

  <Modal title="Eliminar producto" open={modalEliminar} onCancel={()=>abrirCerrarModalEliminar()} onOk={()=>{peticionDelete()}} >
    <p>Estas seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}?</p>
  </Modal>


  </div>



)
}





export default App;


/*
  <div>
    {this.state.data.map(tarjeta=>{
      return(
        <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis"  />,
      <EllipsisOutlined key="delete"  />
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={tarjeta.nombre}
      description={tarjeta.precio}
    />
  </Card>
      )
    })}

  </div>

  <Modal isOpen={this.state.modalInsertar} title="Basic Modal" >
<p>Some contents...</p>
<p>Some contents...</p>
<button onClick={()=>this.modalInsertar()}>hola</button>
</Modal>

*/
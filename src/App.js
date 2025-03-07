import React, { useState, useEffect } from "react"; // Importamos React y los hooks useState y useEffect
import { db } from "./config/firebase"; // Importamos la configuración de Firebase
import { collection, addDoc, getDocs } from "firebase/firestore"; // Importamos las funciones de Firestore para manejar la base de datos
import { jsPDF } from "jspdf"; // Importamos la librería jsPDF para generar archivos PDF

function ReportApp() {
  const [data, setData] = useState([]); // Estado para almacenar los datos obtenidos de Firestore
  const [name, setName] = useState(""); // Estado para manejar el input del nombre
  const [value, setValue] = useState(""); // Estado para manejar el input del valor

  // useEffect se ejecuta una vez al montar el componente, llamando a fetchData para obtener datos de Firestore
  useEffect(() => {
    fetchData();
  }, []);

  // Función para obtener los datos desde Firestore
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "reports")); // Obtenemos todos los documentos de la colección "reports"
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeamos los datos obtenidos y los guardamos en un array
    setData(items); // Actualizamos el estado con los datos obtenidos
  };

  // Función para agregar un nuevo reporte a Firestore
  const handleSubmit = async () => {
    if (!name || !value) return; // Validamos que los campos no estén vacíos
    await addDoc(collection(db, "reports"), { name, value }); // Agregamos un nuevo documento a la colección "reports"
    setName(""); // Limpiamos el campo de nombre
    setValue(""); // Limpiamos el campo de valor
    fetchData(); // Volvemos a obtener los datos para actualizar la tabla
  };

  // Función para exportar los datos a un archivo PDF
  const exportToPDF = () => {
    const doc = new jsPDF(); // Creamos una nueva instancia de jsPDF
    doc.text("Reporte de Datos", 20, 10); // Agregamos un título al PDF
    let y = 20; // Definimos la posición inicial de los datos en el PDF
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name}: ${item.value}`, 20, y); // Escribimos cada dato en el PDF
      y += 10; // Movemos la posición verticalmente para el siguiente dato
    });
    doc.save("reporte.pdf"); // Guardamos el archivo PDF con el nombre "reporte.pdf"
  };

  return (
    <div style={{ padding: "20px" }}> {/* Contenedor con padding para mejorar la presentación */}
      <h1>Generador de Reportes</h1> {/* Título principal de la aplicación */}
      <div>
        {/* Campos de entrada para capturar nombre y valor */}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
        <button onClick={handleSubmit}>Agregar</button> {/* Botón para agregar un nuevo reporte */}
      </div>

      {/* Tabla para mostrar los datos obtenidos de Firestore */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}> {/* Cada fila representa un documento en Firestore */}
              <td>{item.name}</td> {/* Muestra el nombre */}
              <td>{item.value}</td> {/* Muestra el valor */}
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ marginTop: "20px" }} onClick={exportToPDF}>Exportar a PDF</button> {/* Botón para exportar los datos a PDF */}
    </div>
  );
}

export default ReportApp; // Exportamos el componente para su uso en la aplicación


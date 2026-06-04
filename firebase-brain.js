// firebase-brain.js - Migrador Maestro Unificado para MODU
import * as miConfig from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const dbCloud = miConfig.dbCloud || miConfig.db || miConfig.dbFirestore || miConfig.firestore;

// Lista de todas las colecciones que maneja tu sistema
const coleccionesSistema = ["clientes", "proveedores", "ordenes", "ingresos", "egresos"];

document.addEventListener("DOMContentLoaded", () => {
    const botonMigrar = document.getElementById("btnMigrarTodoSistema");
    
    if (botonMigrar) {
        botonMigrar.onclick = async () => {
            if (!confirm("⚠️ ¿Estás seguro de que deseas subir TODOS los datos del LocalStorage a Firebase?")) {
                return;
            }

            botonMigrar.disabled = true;
            botonMigrar.style.background = "#e67e22";
            
            try {
                // Iteramos por cada una de las bases de datos locales
                for (const coleccion of coleccionesSistema) {
                    const datosLocales = JSON.parse(localStorage.getItem(coleccion)) || [];
                    
                    if (datosLocales.length > 0) {
                        let contador = 0;
                        
                        for (const objeto of datosLocales) {
                            contador++;
                            botonMigrar.innerText = `⚡ Subiendo ${coleccion.toUpperCase()} (${contador}/${datosLocales.length})...`;
                            
                            // Si el objeto no tiene ID, le generamos uno único combinando el tiempo y el índice
                            const idDoc = objeto.id ? objeto.id.toString() : Date.now().toString() + "_" + coleccion + "_" + contador;
                            
                            // Guardamos directo en la colección correspondiente de Firebase
                            await setDoc(doc(dbCloud, coleccion, idDoc), objeto);
                        }
                    }
                }

                // Alerta de éxito total
                alert("✅ ¡MIGRACIÓN MAESTRA COMPLETA!\n\nClientes, Proveedores, Órdenes, Ingresos y Egresos han sido respaldados con éxito en la nube de MODU.");
                botonMigrar.innerText = "🎉 Sistema Migrado Exitosamente";
                botonMigrar.style.background = "#3498db";

            } catch (error) {
                console.error("Error en la migración maestra:", error);
                alert("❌ Ocurrió un error al subir los datos. Revisa la consola.");
                botonMigrar.disabled = false;
                botonMigrar.innerText = "🚀 REINTENTAR MIGRACIÓN MAESTRA";
                botonMigrar.style.background = "#e74c3c";
            }
        };
    }
});
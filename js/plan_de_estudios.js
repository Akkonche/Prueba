// JSON. https://www.json.org/json-en.html

// Python
// ---------------------
/*
    Lista: Estructura de datos ordenadas puede almacenar datos de cualquier tipo. Se accede a cada
    elemento a travez de indice

    Diccionario: Estructura de datos guardas los datos a travez de clave y valor. Se accede a cada 
    valor a travez del nombre de la clave.
*/

// let arrDatos = ["hola", "mundo", true, 1234];
// let jsObjData = {
//     "mensaje": "Hola mundo",
//     "tiempo": 12354,
//     "arrColores": ["#fff","#aaa", "#abc", "#000"]
// };


document.addEventListener("DOMContentLoaded", ()=>{
    let pln = new PlanDeEstudio("#planICC", planDeEstudioIF01002);
});

let planDeEstudioIF01002 = {
    "planCodigo": "IF01002", // "IG301A"
    "planNombre": "Ingeniería en Ciencias de la Computación",
    "bloques": [
        {
            "codigo": 1,
            "label": "I",
            "asignaturas": [
                {
                    "codigo": "ES101",
                    "clase": "Español",
                    "creditos": 3
                },
                {
                    "codigo": "MT101",
                    "clase": "Matemáticas",
                    "creditos": 4
                },
                {
                    "codigo": "IF112",
                    "clase": "Introducción a las Ciencias de la Computación",
                    "creditos": 3
                },
                {
                    "codigo": "SC101",
                    "clase": "Sociología",
                    "creditos": 3
                },
                {
                    "codigo": "FI101",
                    "clase": "Filosfía",
                    "creditos": 3
                },
            ]
        },
        {
            "codigo": 2,
            "label": "II",
            "asignaturas": [
                {
                    "codigo": "ES201",
                    "clase": "Expresión Oral y Escrita",
                    "creditos": 3,
                    "requisitos": ["ES101"]
                },
                {
                    "codigo": "MT201",
                    "clase": "Precálculo",
                    "creditos": 4,
                    "requisitos": ["MT101"]
                },
                {
                    "codigo": "IF200",
                    "clase": "Fundamentos y Lógica de Programación",
                    "creditos": 3,
                    "requisitos": ["IF112"]
                },
                {
                    "codigo": "HS101",
                    "clase": "Historia de Honduras",
                    "creditos": 3
                },
                {
                    "codigo": "CR201",
                    "clase": "El Hombre Frente a la Vida",
                    "creditos": 3,
                    "requisitos": ["FI101"]
                },
            ]
        },
        {
            "codigo": 3,
            "label": "III",
            "asignaturas": [
                {
                    "codigo": "MT202",
                    "clase": "Estadística I",
                    "creditos": 4,
                    "requisitos": ["MT101"]
                },
                {
                    "codigo": "MT303",
                    "clase": "Cálculo I",
                    "creditos": 4,
                    "requisitos": ["MT201"]
                },
                {
                    "codigo": "IF214",
                    "clase": "Programación Estructurada I",
                    "creditos": 3,
                    "requisitos": ["IF200"]
                },
                {
                    "codigo": "IF213",
                    "clase": "Estructura Discretas",
                    "creditos": 3,
                    "requisitos": ["IF200"]
                },
                {
                    "codigo": "IF394",
                    "clase": "Diseño Gráfico",
                    "creditos": 1
                },
            ]
        }
    ]
};


class PlanDeEstudio {
    container = null;
    planData = null;
    asignaturas = {};
    selectedAsignaturaData = null;
    constructor ( rootSelector, planData) {
        this.container = document.querySelector(rootSelector);
        if (!this.container) {
            throw new Error("Elemento HTML no es accesible para renderizar el plan de estudio");
        }
        this.planData = planData;
        if (!this.planData) {
            throw new Error("No hay datos para renderizar el plan de estudio");
        }
        this.createUX();
    }

    createUX(){
        let rootSection = document.createElement("SECTION");
        rootSection.classList.add("plan");
        let rootTitle = document.createElement("H2");
        rootTitle.innerHTML = `${this.planData.planCodigo} - ${this.planData.planNombre}`;
        rootSection.appendChild(rootTitle);
        this.planData.bloques.forEach(bloqueData => {
            let bloque = document.createElement("DIV");
            bloque.classList.add("bloque");
            let bloqueTitle = document.createElement("DIV");
            bloqueTitle.classList.add("bloque-title");
            bloqueTitle.innerHTML = `${bloqueData.label}`;
            bloque.appendChild(bloqueTitle);
            bloqueData.asignaturas.forEach(asignaturaData => {
                let asignatura = document.createElement("DIV");
                let asignaturaTitle = document.createElement("SPAN");
                let asignaturaCreditos = document.createElement("SPAN");
                asignaturaTitle.innerHTML = `${asignaturaData.codigo} ${asignaturaData.clase}`;
                asignaturaCreditos.innerHTML = `Crd: ${asignaturaData.creditos}`;
                asignatura.classList.add("asignatura");
                asignatura.appendChild(asignaturaTitle);
                asignatura.appendChild(asignaturaCreditos);
                let requisitos = [];
                if (asignaturaData.requisitos) {
                    requisitos = asignaturaData.requisitos;
                }
                this.asignaturas[asignaturaData.codigo] = {
                    nodo : asignatura,
                    reqs : [...requisitos],
                    opns : []
                }
                requisitos.forEach( req => {
                        if (this.asignaturas[req]) {
                            this.asignaturas[req].opns.push(asignaturaData.codigo);
                        }
                    }
                );
                asignatura.addEventListener("click",(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(asignaturaData.codigo);
                    const selectedAsignatura = this.asignaturas[asignaturaData.codigo];
                    // limpieza
                    if(this.selectedAsignaturaData) {
                        this.selectedAsignaturaData.nodo.classList.remove("selected");
                        this.selectedAsignaturaData.reqs.forEach( req => {
                            this.asignaturas[req].nodo.classList.remove("required");
                        });
                        this.selectedAsignaturaData.opns.forEach( opn => {
                            this.asignaturas[opn].nodo.classList.remove("opens");
                        });
                    }
                    // setear el nuevo selected
                    this.selectedAsignaturaData = selectedAsignatura;
                    this.selectedAsignaturaData.nodo.classList.add("selected");
                    this.selectedAsignaturaData.reqs.forEach( req => {
                        this.asignaturas[req].nodo.classList.add("required");
                    });
                    this.selectedAsignaturaData.opns.forEach( opn => {
                        this.asignaturas[opn].nodo.classList.add("opens");
                    });
                });
                bloque.appendChild(asignatura);
            });
            rootSection.appendChild(bloque);
        });
        this.container.appendChild(rootSection);
    }

    bindEvents(){

    }

}
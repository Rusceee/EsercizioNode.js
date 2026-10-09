var express = require("express");              // Importa il framework Express.
var path = require("path");                    // Importa il modulo per gestire i percorsi dei file.
var app = express();                           // Crea l'applicazione Express.
var port = 3000;                               // Definisce la porta del server.
var bodyParser = require("body-parser");       // Importa il middleware per leggere il corpo delle richieste.
var axios = require("axios");                  // Importa il client HTTP per chiamare l'API meteo.

const pageroutes = require("./routes/pageroutes");
const weather = require("./routes/weather");            // per gestire la parte di routing delle pagine statiche, importo il file pageroutes.js che contiene le route per le pagine statiche.

// il body parser serve per leggere i dati inviati dal form
app.use(bodyParser.json());                    // Abilita la lettura del corpo in formato JSON.
app.use(bodyParser.urlencoded({ extended: true })); // Abilita la lettura dei dati inviati dai form HTML.


app.use(express.static(path.join(__dirname, "../../../frontend/public"))); // Serve i file statici della cartella public.


//post per il login, se username e password sono corretti, invia un messaggio di successo, altrimenti invia un messaggio di errore
app.post('/login', (req, res) =>{              // Definisce la route POST per elaborare il login.
    const{username, password} = req.body;      // Estrae username e password dal corpo della richiesta.

    if(username === 'admin' && password === '1234'){ // Controlla se le credenziali sono corrette.
        res.send('Login è avvenuto con successo!');  // Risponde con un messaggio di successo.
    } else {                                     // Altrimenti le credenziali sono errate.
        res.send('Login fallito. <br> Username inserito: ' + username + ' <br> Password inserita: ' + password + '.'); // Risponde con un messaggio di errore.
    } // Chiude l'if-else.
}); // Chiude la route POST /login.


//pagina di signup

//post per la registrazione, senza persistenza
app.post('/signup', (req, res) =>{             // Definisce la route POST per elaborare la registrazione.
    const{username, password} = req.body;      // Estrae username e password dal corpo della richiesta.
    res.send('Registrazione completata per: ' + username); // Risponde confermando la registrazione.
}); // Chiude la route POST /signup.



/*
app.post('/weather', async (req, res) =>{             // Definisce la route POST per elaborare la richiesta meteo.
    const city = req.body.city;                       // Estrae la città dal corpo della richiesta.
    const apiKey = "c28acc12768cc42c658f08d6c9839b40"; // Chiave per l'API di OpenWeatherMap.

    try {                                             // Inizia un blocco try per gestire eventuali errori.
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        ); // Chiama l'API meteo di OpenWeatherMap.

        const data = response.data;

        if (data.cod !== 200) {                       // Controlla se la risposta è valida.
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        }); // Invia la risposta JSON al client con i dati meteo.

    } catch (error) {
        console.error("Errore durante la richiesta meteo:", error.message);
        res.json({
            error: true,
            message: "Errore nel recupero dei dati meteo"
        });
    }
}); // Chiude la route POST /weather.
*/
app.use("/", pageroutes); // Usa le route definite in pageroutes.js per tutte le richieste alla radice.
app.use("/", weather);  // usa le route di weather
//definizione dello stato visualizzabile da prompt
app.listen(port, ()=> {                        // Avvia il server sulla porta definita.
console.log("Server in ascolto alla porta " + port); // Scrive in console la porta di ascolto.
console.log('accedi all indirizzo http://localhost:'+port) // Scrive in console l'indirizzo da aprire nel browser.
}); // Chiude il metodo listen.







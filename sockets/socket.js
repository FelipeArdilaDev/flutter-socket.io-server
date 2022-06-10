const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('bon jovi'));
bands.addBand(new Band('hereoes del silencio'));
bands.addBand(new Band('Metalica'));

console.log(bands);

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'})
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands());
    });

    // escucchar: add-band

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('remove-band', (payload) => {
        bands.deleteband(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload) => {
    //     //console.log(payload);
    //     //io.emit('nuevo-mensaje', payload); //emite a todps!
    //     client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos el que lo emitio
    // })
  });
class Patient {
  static patientHistory = [];
  treated = false;

  constructor(name) {
    this.name = name;
    Patient.patientHistory.push(this);

    // Book an appointment immediately a patient is admitted (or created)
    // A patient is treated when an appointment is completed
    this.bookAppointment();
  }

  static getSickPatients() {
    return Patient.patientHistory.filter((patient) => !patient.treated);
  }

  static getTreatedPatients() {
    return Patient.patientHistory.filter((patient) => patient.treated);
  }

  bookAppointment() {
    // get the first free doctor (i.e doctor with appointments less than maxAppointment)
    const freeDoctor = Doctor.doctors.find((doctor) => doctor.isFree());

    if (!freeDoctor) {
      console.log(
        "Appointment booking failed, There's no doctor to attend to your appointment right now"
      );
      return false;
    }

    new Appointment(freeDoctor, this);
    return true;
  }

  dismiss() {
    // When a patient is permanently unreachable or dead, then remove it from patient history
    Patient.patientHistory.splice(Patient.patientHistory.indexOf(this), 1);

    // Remove all pending appointments
    Appointment.getPendingAppointments().forEach((appointment) => {
      if (appointment.patient.name === this.name) {
        appointment.remove();
      }
    });

    console.log(`Patient ${this.name} has been dismissed`);
    return true;
  }
}

class Doctor {
  static doctors = [];

  constructor(name, maxAppointment = 5) {
    this.name = name;
    this.maxAppointment = maxAppointment;
    Doctor.doctors.push(this);
  }

  attendAppointment() {
    const earliestAppointment = this.getPendingAppointments()[0];

    if (!earliestAppointment) {
      console.log(
        "You can relax doc, There's no appointment to attend to right now"
      );
      return false;
    }

    earliestAppointment.completeAppointment();
    console.log(
      `Doctor ${this.name} attended to ${earliestAppointment.patient.name}`
    );
    return true;
  }

  getAllAppointment() {
    // This gets both the completed and pending appointments from the current doctor
    return Appointment.appointmentHistory.filter(
      (appointment) => appointment.doctor.name === this.name
    );
  }

  getPendingAppointments() {
    return this.getAllAppointment().filter(
      (appointment) => !appointment.completed
    );
  }

  isFree() {
    return this.getPendingAppointments().length < this.maxAppointment;
  }

  fire() {
    Doctor.doctors.splice(Doctor.doctors.indexOf(this), 1);
    console.log(`Doctor ${this.name}, You've been fired`);
    return true;
  }
}

class Appointment {
  static appointmentHistory = [];
  completed = false;

  constructor(doctor, patient) {
    this.doctor = doctor;
    this.patient = patient;
    Appointment.appointmentHistory.push(this);
    console.log(
      `Appointment for Doctor:${doctor.name} and Patient:${patient.name} successfully booked`
    );
  }

  static getCompletedAppointments() {
    return Appointment.appointmentHistory.filter(
      (appointment) => appointment.completed
    );
  }

  static getPendingAppointments() {
    return Appointment.appointmentHistory.filter(
      (appointment) => !appointment.completed
    );
  }

  getAppointmentDetails() {
    return `${this.doctor.name} has an appointment with ${this.patient.name}`;
  }

  completeAppointment() {
    this.completed = true;
    this.patient.treated = true;
  }

  remove() {
    if (this.completed) {
      console.log(`You cannot remove completed appointments`);
      return false;
    }

    Appointment.appointmentHistory.splice(
      Appointment.appointmentHistory.indexOf(this),
      1
    );
    console.log(
      `Appointment for Doctor:${this.doctor.name} and Patient:${this.patient.name} successfully removed`
    );
    return true;
  }
}

// Usage - You can comment and uncomment what you need for this usage example to work

const doctorJames = new Doctor("James");
console.log("Doctors: ", Doctor.doctors); // We only have one doctor for now

// patients book appointments with any free doctor (in this cas doctorJames)
// authomatically when they are admitted
const patient1 = new Patient("Emeka");
const patient2 = new Patient("Juliet");

console.log(
  "\nDoctor james current appointments",
  doctorJames.getPendingAppointments()
);

// Attend to the first created appointment which is the first admiited patient
doctorJames.attendAppointment();

console.log("\nSick patients: ", Patient.getSickPatients()); // only patient2 because patient1 was treated during the appointment
console.log("Treated patients: ", Patient.getTreatedPatients()); // only patient1 have been treated so far

console.log(
  "\nDoctor james current appointments",
  doctorJames.getPendingAppointments()
); // only patient is still left to be treated

patient2.dismiss(); //patient probably died before and no longer exists

console.log(
  "\nDoctor james current appointments",
  doctorJames.getPendingAppointments()
); // no more patients since his last one died before appointment

doctorJames.fire(); // This is just an example 😜

console.log("Doctors: ", Doctor.doctors); // doctorJames has been fired so no more doctors

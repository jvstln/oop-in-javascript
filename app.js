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
    console.log("Appointment successfully booked");
    return true;
  }

  dismissPatient() {}
}

class Doctor {
  static doctors = [];

  constructor(name, maxAppointment = 5) {
    this.name = name;
    this.maxAppointment = maxAppointment;
    Doctor.doctors.push(this);
  }

  attendAppointment() {}

  getAppointments() {}

  isFree() {
    return true;
  }

  fire() {}
}

class Appointment {
  static appointmentHistory = [];
  completed = false;

  constructor(doctor, patient) {
    this.doctor = doctor;
    this.patient = patient;
    Appointment.appointmentHistory.push(this);
  }

  getAppointmentDetails() {
    return `${this.doctor.name} has an appointment with ${this.patient.name}`;
  }

  completeAppointment() {}
}

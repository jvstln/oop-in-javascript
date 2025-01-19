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

  static getSickPatients() {}

  static getTreatedPatients() {}

  bookAppointment() {}

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

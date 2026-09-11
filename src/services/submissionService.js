import axios from "axios";

const ENQUIRY_ENDPOINT = "/api/contact/enquiries";

const splitName = (fullName) => {
  const parts = (fullName || "").trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
};

const buildMessage = (lines) =>
  lines
    .filter((line) => line && line.label && line.value)
    .map((line) => `${line.label}: ${line.value}`)
    .join("\n");

const parseError = (err) =>
  err?.response?.data?.message ||
  "Something went wrong. Please try again later.";

export const submitVacancy = async (data) => {
  try {
    const { firstName, lastName } = splitName(data.contactName);
    const payload = new FormData();
    payload.append("firstName", firstName);
    payload.append("lastName", lastName);
    payload.append("company", data.company.trim());
    payload.append("email", data.email.trim());
    payload.append("iam", "employer");
    payload.append("subject", `Vacancy Submission - ${data.jobTitle.trim()}`);
    payload.append(
      "message",
      buildMessage([
        { label: "Job Title", value: data.jobTitle },
        { label: "Company", value: data.company },
        { label: "Category", value: data.category },
        { label: "Location", value: data.location },
        { label: "Employment Type", value: data.employmentType },
        { label: "Salary Range", value: data.salaryRange },
        { label: "Experience Level", value: data.experienceLevel },
        { label: "Application Deadline", value: data.deadline },
        { label: "Skills", value: data.skills },
        { label: "Contact Name", value: data.contactName },
        { label: "Contact Email", value: data.email },
        { label: "Job Description", value: data.description },
      ])
    );

    const response = await axios.post(ENQUIRY_ENDPOINT, payload);
    return {
      success: response.data?.success !== false,
      message:
        response.data?.message ||
        "Your vacancy has been submitted successfully.",
    };
  } catch (err) {
    return { success: false, message: parseError(err) };
  }
};

export const submitCv = async (data) => {
  try {
    const { firstName, lastName } = splitName(data.fullName);
    const payload = new FormData();
    payload.append("firstName", firstName);
    payload.append("lastName", lastName);
    payload.append("company", "Not specified");
    payload.append("email", data.email.trim());
    payload.append("iam", "job_seeker");
    payload.append("subject", "CV Submission");
    payload.append(
      "message",
      buildMessage([
        { label: "Full Name", value: data.fullName },
        { label: "Phone", value: data.phone },
        { label: "Current Location", value: data.location },
        { label: "Professional Title", value: data.professionalTitle },
        { label: "Skills", value: data.skills },
        { label: "Experience Level", value: data.experienceLevel },
        { label: "Highest Education", value: data.education },
        { label: "Cover Message", value: data.coverMessage },
      ])
    );
    if (data.resume) {
      payload.append("attachment", data.resume);
    }

    const response = await axios.post(ENQUIRY_ENDPOINT, payload);
    return {
      success: response.data?.success !== false,
      message:
        response.data?.message ||
        "Your CV has been submitted successfully.",
    };
  } catch (err) {
    return { success: false, message: parseError(err) };
  }
};
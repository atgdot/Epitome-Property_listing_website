const BASE_URL = "http://localhost:3000/api/v1/admin-dashboard"; // Ensure this is correct

export const request = async (url, method = "GET", data = null) => {
  const fullUrl = `${BASE_URL}${url}`;
  console.log(`📡 [API REQUEST] ${method} ${fullUrl}`, data);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      console.error(`❌ [API ERROR] ${method} ${fullUrl} - Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`✅ [API RESPONSE] ${method} ${fullUrl}`, result);
    return result;
  } catch (error) {
    console.error(`❌ [API ERROR] ${method} ${fullUrl} -`, error);
    throw error;
  }
};

/* ===================== PROPERTY SERVICES ===================== */
export const createProperty = (data) => request("/property/create", "POST", data);
export const getAllProperties = () => request("/property/all");
export const getPropertyById = (id) => request(`/property/${id}`);
export const updateProperty = (id, data) => request(`/property/update/${id}`, "PUT", data);
export const deleteProperty = (id) => request(`/property/${id}`, "DELETE");

/* ===================== RESIDENTIAL PROPERTY SERVICES ===================== */
export const createResidentialProperty = (data) => request("/property/residentailCreate", "POST", data);
export const updateResidentialProperty = (id, data) => request(`/property/${id}`, "PUT", data);
export const deleteResidentialProperty = (id) => request(`/property/${id}`, "DELETE");

/* ===================== USER SERVICES ===================== */
export const createUser = (data) => request("/user/create", "POST", data);
export const updateUser = (id, data) => request(`/user/update/${id}`, "PUT", data);
export const searchUserByName = (name) => request(`/user/search?name=${name}`);
export const deleteUser = (id) => request(`/user/delete/${id}`, "DELETE");

/* ===================== AGENT SERVICES ===================== */
export const createAgent = (data) => request("/user/create", "POST", data);
export const updateAgent = (id, data) => request(`/user/update/${id}`, "PUT", data);
export const searchAgentByName = (name) => request(`/user/search?name=${name}`);
export const deleteAgent = (id) => request(`/user/delete/${id}`, "DELETE");

/* ===================== REVIEW SERVICES ===================== */
export const addReview = (data) => request("/review/add", "POST", data);

/* ===================== FEEDBACK SERVICES ===================== */
const FEEDBACK_URL = "http://localhost:5000/api/v1/feedback"; // Ensure this is correct

export const submitFeedback = async (data) => {
  const fullUrl = `${FEEDBACK_URL}/submit`;
  console.log(`📡 [API REQUEST] POST ${fullUrl}`, data);

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`❌ [FEEDBACK API ERROR] POST ${fullUrl} - Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`✅ [FEEDBACK API RESPONSE] POST ${fullUrl}`, result);
    return result;
  } catch (error) {
    console.error(`❌ [FEEDBACK API ERROR] POST ${fullUrl} -`, error);
    throw error;
  }
};

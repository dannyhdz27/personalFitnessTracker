export default async function getRoutines() {
  try {
    const response = await fetch(`/api/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  getRoutines();
}
export async function createRoutine(name, notes) {
  try {
    const response = await fetch("/api/routines/", {
      method: "POST",
      body: JSON.stringify({
        name,
        notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

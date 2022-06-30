export function get_relevant_age_range({ birthday, gender, wanted }) {
  let years_to_reduce = 5;
  if (gender !== wanted && gender === "female") years_to_reduce = 3;
  else if (gender !== wanted && gender === "male") years_to_reduce = 10;
  let years_to_increase = 5;
  if (gender !== wanted && gender === "female") years_to_increase = 10;
  else if (gender !== wanted && gender === "male") years_to_increase = 3;

  const minAge = new Date(birthday).setFullYear(
    new Date(birthday).getFullYear() - years_to_increase
  );
  const maxAge = new Date(birthday).setFullYear(
    new Date(birthday).getFullYear() + years_to_reduce
  );
  console.log("min:" + new Date(minAge).getFullYear());
  console.log("max:" + new Date(maxAge).getFullYear());
  return { minAge, maxAge };
}

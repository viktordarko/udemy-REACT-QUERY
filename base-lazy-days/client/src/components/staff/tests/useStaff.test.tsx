import { act, renderHook, waitFor } from "@testing-library/react";

import { useStaff } from "../hooks/useStaff";

import { createQueryClientWrapper } from "@/test-utils";

test("filter staff", async () => {

  const { result } = renderHook(() => useStaff(), {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the staff to populate
  await waitFor(() => expect(result.current.staff).toHaveLength(4));

  //set to filter for facial
  act(() => {
    result.current.setFilter("facial");
  });

  await waitFor(() => expect(result.current.staff).toHaveLength(3));

});

import { useCallback, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

interface DatePickerProps {
  date: Date;
  handleSave: (value: Date) => void;
}

const DatePicker = ({ date, handleSave }: DatePickerProps) => {
  const [value, setValue] = useState<Date | null>(date);

  const handleChange = useCallback(
    (newDate: Date) => {
      setValue(newDate);
      handleSave(newDate);
    },
    [setValue, handleSave]
  );

  return (
    <DatePickerInput
      icon={<IconCalendar size={20} strokeWidth={1.5} />}
      variant="unstyled"
      value={value}
      onChange={handleChange}
      styles={{ input: { padding: 0 } }}
    />
  );
};

export default DatePicker;

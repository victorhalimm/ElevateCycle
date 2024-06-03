import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { DurationProps } from "./pomodoro-timer";
import { Input } from "@/components/ui/input";
import { changeSecondToMinute } from "@/lib/types/timer";
import { Button } from "@/components/ui/button";

interface TimerSettingsProps {
  children: JSX.Element;
  duration: DurationProps;
  setDuration: (duration: DurationProps) => void;
  handleSettingsChange: (duration: DurationProps) => void;
}

const TimerSettings = ({
  children,
  duration,
  setDuration,
  handleSettingsChange,
}: TimerSettingsProps) => {


  const handleDurationChange = (type : keyof DurationProps, value : number) => {
    // @ts-expect-error Any gajels
    setDuration((prev) => ({
      ...prev,
      [type]: value * 60
    }))
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-pageBlack">
        <DialogHeader className="text-pageCream">
          <DialogTitle className="font-semibold">Timer Settings</DialogTitle>
          <DialogDescription className="text-pageCream opacity-50">
            Configure your preference for the provided Pomodoro Timer.
          </DialogDescription>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="pomodoro" className="text-base">Pomodoro</label>
                <div className="w-full">
                  <Input
                    id="pomodoro"
                    className="bg-pageBlack border-pageCream"
                    type="number"
                    value={changeSecondToMinute(duration.Pomodoro)}
                    onChange={(e) => handleDurationChange("Pomodoro", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="short" className="text-base">Short Break</label>
                <div className="">
                  <Input
                    id="short"
                    className="bg-pageBlack border-pageCream"
                    type="number"
                    value={changeSecondToMinute(duration.Short)}
                    onChange={(e) => handleDurationChange("Short", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="long" className="text-base">Long Break</label>
                <div className="">
                  <Input
                    id="long"
                    className="bg-pageBlack border-pageCream"
                    type="number"
                    value={changeSecondToMinute(duration.Long)}
                    onChange={(e) => handleDurationChange("Long", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={() => handleSettingsChange(duration)}
              className="bg-pageBlue text-pageCream font-semibold p-4 rounded-lg"
              type="submit"
            >
              Save Settings
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimerSettings;

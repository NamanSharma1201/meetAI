import ResponsiveDialog from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";
interface UpdateAgentDoalogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intialValues: AgentGetOne;
}
const UpdateAgentDialog = ({
  open,
  onOpenChange,
  intialValues,
}: UpdateAgentDoalogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Update your Agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={intialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;

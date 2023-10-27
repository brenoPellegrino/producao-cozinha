import IResponsibleCardProps from "../../interfaces/IResponsibleCardProps";

export default function ResponsibleCard(responsible: IResponsibleCardProps) {
  return (
    <div>
      <p id={`responsibleId=${responsible.userId}`}>{responsible.name}</p>
    </div>
  );
}
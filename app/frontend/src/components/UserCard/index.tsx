import React from "react";
import IUserCardProps from "../../interfaces/IUserCardProps";

export default function UserCard({ employee }: IUserCardProps) {
  return <p>{employee}</p>;
}

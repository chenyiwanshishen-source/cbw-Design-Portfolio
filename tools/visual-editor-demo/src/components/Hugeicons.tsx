import React from 'react';
type Props = React.SVGProps<SVGSVGElement> & { size?: number };
const AlertCirclePaths = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 8V12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function AlertCircle({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(AlertCirclePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const AlignJustifyPaths = [
  ["path", { d: "M3 3H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 9H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 15H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M3 21H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
export function AlignJustify({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(AlignJustifyPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const BoxPaths = [
  ["path", { d: "M2.79289 21.2071C3.08579 21.5 3.55719 21.5 4.5 21.5H14.5C15.4428 21.5 15.9142 21.5 16.2071 21.2071M2.79289 21.2071C2.5 20.9142 2.5 20.4428 2.5 19.5V9.5C2.5 8.55719 2.5 8.08579 2.79289 7.79289M2.79289 21.2071L8.79289 15.2071M16.2071 21.2071C16.5 20.9142 16.5 20.4428 16.5 19.5V9.5C16.5 8.55719 16.5 8.08579 16.2071 7.79289M16.2071 21.2071L21.2071 16.2071C21.5 15.9142 21.5 15.4428 21.5 14.5V4.5C21.5 3.55719 21.5 3.08579 21.2071 2.79289M16.2071 7.79289C15.9142 7.5 15.4428 7.5 14.5 7.5H4.5C3.55719 7.5 3.08579 7.5 2.79289 7.79289M16.2071 7.79289L21.2071 2.79289M2.79289 7.79289L7.79289 2.79289C8.08579 2.5 8.55719 2.5 9.5 2.5H19.5C20.4428 2.5 20.9142 2.5 21.2071 2.79289M8.79289 15.2071C9.08579 15.5 9.55719 15.5 10.5 15.5H14M8.79289 15.2071C8.5 14.9142 8.5 14.4428 8.5 13.5V10.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function Box({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(BoxPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const CheckPaths = [
  ["path", { d: "M5 14L8.5 17.5L19 6.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function Check({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(CheckPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const CheckCircle2Paths = [
  ["path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 12.5L10.5 15L16 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function CheckCircle2({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(CheckCircle2Paths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const CheckSquarePaths = [
  ["path", { d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 12.5L10.5 15L16 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function CheckSquare({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(CheckSquarePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const ChevronDownPaths = [
  ["path", { d: "M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function ChevronDown({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(ChevronDownPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const ChevronRightPaths = [
  ["path", { d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function ChevronRight({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(ChevronRightPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
/** @deprecated Renamed to `Layout2ColumnIcon`; this file will be removed in the next major version. */
const ColumnsPaths = [
  ["path", { d: "M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 2.5V21.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
export function Columns({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(ColumnsPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const CreditCardPaths = [
  ["path", { d: "M10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2.5 9H21.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14 15L18 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function CreditCard({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(CreditCardPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const Edit3Paths = [
  ["path", { d: "M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 4L20 11", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14 22L22 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function Edit3({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(Edit3Paths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const FileCodePaths = [
  ["path", { d: "M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14.5 4L9.5 20", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function FileCode({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(FileCodePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const FileTextPaths = [
  ["path", { d: "M8 7L16 7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 11L12 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function FileText({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(FileTextPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const FilterPaths = [
  ["path", { d: "M3 7H6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 17H9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M18 17L21 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M15 7L21 7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z", stroke: "currentColor", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z", stroke: "currentColor", strokeWidth: "1.5", key: "5" }]
];
export function Filter({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(FilterPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const FolderOpenPaths = [
  ["path", { d: "M3.93802 21H14.9395C17.1335 21 18.2305 21 19.0351 20.3884C19.8398 19.7768 20.1334 18.7198 20.7206 16.6059L21.9197 12.289C21.973 12.0972 22 11.8991 22 11.7001C22 10.485 21.015 9.5 19.7999 9.5H12.5634C10.5123 9.5 9.48671 9.5 8.71918 10.0273C8.59312 10.1139 8.47387 10.21 8.36246 10.3148C7.68418 10.9528 7.46632 11.9549 7.03061 13.9592L5.83181 19.4737C5.63814 20.3646 4.84972 21 3.93802 21ZM3.93802 21C2.86768 21 2 20.1323 2 19.062V7.76613C2 5.53633 2 4.42144 2.68424 3.72186C2.69664 3.70918 2.70918 3.69664 2.72186 3.68424C3.42144 3 4.53633 3 6.76613 3C7.37053 3 7.67273 3 7.94502 3.11102C7.95015 3.11311 7.95527 3.11523 7.96038 3.11738C8.23142 3.23142 8.4451 3.4451 8.87248 3.87248L9.62132 4.62132C10.0549 5.05487 10.2716 5.27164 10.5473 5.38582C10.823 5.5 11.1295 5.5 11.7426 5.5H16.5C17.5245 5.5 18.0367 5.5 18.4454 5.65383C19.0922 5.89728 19.6027 6.40776 19.8462 7.0546C20 7.46331 20 7.97554 20 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function FolderOpen({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(FolderOpenPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const GitCommitPaths = [
  ["path", { d: "M12 3L12 8.5M12 21L12 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];
export function GitCommit({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(GitCommitPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const GitPullRequestPaths = [
  ["path", { d: "M6 8L6 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "6", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["circle", { cx: "6", cy: "6", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "3" }],
  ["circle", { cx: "18", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "4" }]
];
export function GitPullRequest({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(GitPullRequestPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const GlobePaths = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M21 15H3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M21 9H3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
export function Globe({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(GlobePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const GripVerticalPaths = [
  ["path", { d: "M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "5" }]
];
export function GripVertical({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(GripVerticalPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const HeadingPaths = [
  ["path", { d: "M4 5V19", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14 5V19", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M17 19H18.5M20 19H18.5M18.5 19V11L17 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M4 12L14 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
export function Heading({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(HeadingPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const ImagePaths = [
  ["circle", { cx: "7.5", cy: "7.5", r: "1.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424", stroke: "currentColor", strokeWidth: "1.5", key: "2" }]
];
export function Image({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(ImagePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const LayersPaths = [
  ["path", { d: "M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function Layers({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(LayersPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const LayoutPaths = [
  ["path", { d: "M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2.5 9L21.5 9", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M8 21.5L8 9", stroke: "currentColor", strokeWidth: "1.5", key: "2" }]
];
export function Layout({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(LayoutPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const LinkPaths = [
  ["path", { d: "M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
export function Link({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(LinkPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const Link2Paths = [
  ["path", { d: "M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
export function Link2({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(Link2Paths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const MaximizePaths = [
  ["path", { d: "M15.5 21C16.8956 21 17.5933 21 18.1611 20.8278C19.4395 20.44 20.44 19.4395 20.8278 18.1611C21 17.5933 21 16.8956 21 15.5M21 8.5C21 7.10444 21 6.40666 20.8278 5.83886C20.44 4.56046 19.4395 3.56004 18.1611 3.17224C17.5933 3 16.8956 3 15.5 3M8.5 21C7.10444 21 6.40666 21 5.83886 20.8278C4.56046 20.44 3.56004 19.4395 3.17224 18.1611C3 17.5933 3 16.8956 3 15.5M3 8.5C3 7.10444 3 6.40666 3.17224 5.83886C3.56004 4.56046 4.56046 3.56004 5.83886 3.17224C6.40666 3 7.10444 3 8.5 3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function Maximize({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(MaximizePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const Maximize2Paths = [
  ["path", { d: "M19.9264 22.2516V20.691C19.9264 20.288 20.0525 19.8966 20.2639 19.5531C21.7583 17.1245 22.2279 14.5196 21.9002 13.505C20.857 11.3418 17.3758 10.4907 15.76 10.2878L16.7966 5.12292C16.9705 4.30387 16.3513 3.47938 15.4135 3.28136C14.4758 3.08334 13.5746 3.58679 13.4007 4.40583L11.3462 14.0815L8.77462 12.4424C8.77462 12.4424 7.47969 11.406 6.44041 12.4424C5.40114 13.4788 6.44041 14.7701 6.44041 14.7701L10.3488 19.7776C10.6003 20.0997 10.7468 20.4908 10.7688 20.8984L10.8401 22.2177", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7.32936 1.85194C7.32936 1.85194 9.54861 1.58797 9.867 1.90156C10.1124 2.14335 9.867 4.36134 9.867 4.36134M9.867 1.90156L6.89808 4.84002M4.6477 9.59694C4.6477 9.59694 2.42845 9.86092 2.11005 9.54732C1.86463 9.30553 2.11005 7.08754 2.11005 7.08754M2.11005 9.54732L5.07898 6.60886", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Maximize2({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(Maximize2Paths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const MonitorPaths = [
  ["path", { d: "M14 21H16M14 21C13.1716 21 12.5 20.3284 12.5 19.5V17L12 17M14 21H10M10 21H8M10 21C10.8284 21 11.5 20.3284 11.5 19.5V17L12 17M12 17V21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V11C2 13.8284 2 15.2426 2.87868 16.1213C3.75736 17 5.17157 17 8 17H16C18.8284 17 20.2426 17 21.1213 16.1213C22 15.2426 22 13.8284 22 11V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Monitor({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(MonitorPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const MousePointerPaths = [
  ["path", { d: "M5.10772 14.3857L5.58594 7.91256C5.61875 7.46854 5.64642 7.05187 5.67232 6.66186C5.85017 3.98379 5.94481 2.55876 7.04807 2.10979C8.15132 1.66082 9.2022 2.61969 11.1771 4.42168C11.4647 4.68413 11.772 4.96446 12.1018 5.26093L16.9102 9.58273C18.2626 10.7983 18.9389 11.4062 18.9934 11.9885C19.0309 12.3882 18.9067 12.7862 18.6489 13.0924C18.2733 13.5385 17.3734 13.6473 15.5737 13.8647C14.8156 13.9563 14.4365 14.0021 14.2073 14.2038C14.0479 14.344 13.9376 14.5321 13.8925 14.7404C13.8277 15.0399 13.9707 15.3964 14.2567 16.1095L15.7394 19.8058C15.9107 20.2328 15.9963 20.4464 15.995 20.6429C15.9932 20.9078 15.8865 21.1609 15.6986 21.3462C15.5591 21.4837 15.3471 21.57 14.9232 21.7425C14.4993 21.915 14.2873 22.0013 14.0921 22C13.8292 21.9982 13.5778 21.8907 13.3939 21.7015C13.2574 21.561 13.1717 21.3475 13.0004 20.9204L11.5177 17.2241C11.2317 16.5111 11.0887 16.1545 10.8355 15.9844C10.6595 15.8662 10.4503 15.8081 10.239 15.8187C9.935 15.834 9.63074 16.0663 9.02224 16.5308C7.57763 17.6337 6.85532 18.1851 6.27746 18.1269C5.88085 18.0871 5.51701 17.8877 5.26831 17.574C4.90595 17.1169 4.9732 16.2065 5.10772 14.3857Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
export function MousePointer({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(MousePointerPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const PalettePaths = [
  ["path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.8417 22 14 22.1163 14 21C14 20.391 13.6832 19.9212 13.3686 19.4544C12.9082 18.7715 12.4523 18.0953 13 17C13.6667 15.6667 14.7778 15.6667 16.4815 15.6667C17.3334 15.6667 18.3334 15.6667 19.5 15.5C21.601 15.1999 22 13.9084 22 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["circle", { cx: "9.5", cy: "8.5", r: "1.5", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "16.5", cy: "9.5", r: "1.5", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M7.125 15H7M7.25 15C7.25 15.1381 7.13807 15.25 7 15.25C6.86193 15.25 6.75 15.1381 6.75 15C6.75 14.8619 6.86193 14.75 7 14.75C7.13807 14.75 7.25 14.8619 7.25 15Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
export function Palette({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(PalettePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const PlusPaths = [
  ["path", { d: "M12.001 4.00101V20.001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20.001 12.001L4.00098 12.001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Plus({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(PlusPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const PlusSquarePaths = [
  ["path", { d: "M12 3.00005C16.2426 3.00005 18.364 3.00005 19.682 4.31807C21 5.63609 21 7.75741 21 12.0001C21 16.2427 21 18.364 19.682 19.682C18.364 21.0001 16.2426 21.0001 12 21.0001C7.75736 21.0001 5.63604 21.0001 4.31802 19.682C3 18.364 3 16.2427 3 12.0001C3 7.75741 3 5.63609 4.31802 4.31807C5.63604 3.00005 7.75736 3.00005 12 3.00005Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.0001 8.00005V12.0001M12.0001 12.0001V16.0001M12.0001 12.0001H16.0001M12.0001 12.0001H8.00006", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function PlusSquare({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(PlusSquarePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const RedoPaths = [
  ["path", { d: "M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20.9991 3V4.27816C20.9991 6.47004 20.9991 7.56599 20.2918 8.16512C19.5846 8.76425 18.5036 8.58408 16.3415 8.22373L14.9991 8", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Redo({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(RedoPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const RefreshCwPaths = [
  ["path", { d: "M16.5 7.99976H18C19.4142 7.99976 20.1213 7.99976 20.5607 7.56042C21 7.12108 21 6.41397 21 4.99976V3.49976", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 11.9998C3 7.02919 7.0293 2.99976 12 2.99976C15.571 2.99976 18.0948 4.73029 20 7.08347M21 11.9998C21 16.9703 16.9707 20.9998 12 20.9998C8.42904 20.9998 5.90524 19.2692 4 16.916", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M7.5 15.9998H6C4.58579 15.9998 3.87868 15.9998 3.43934 16.4391C3 16.8784 3 17.5855 3 18.9998V20.4998", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function RefreshCw({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(RefreshCwPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const RotateCwPaths = [
  ["path", { d: "M4 2V5.13219C4 5.42605 4.36724 5.55908 4.55527 5.33333C6.3854 3.2875 9.04499 2 12.0051 2C17.5251 2 22 6.47715 22 12C22 15.9582 19.7015 19.3793 16.367 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.7347 22.0001C12.2016 22.0001 12.6611 21.9688 13.1111 21.9084M2.26537 8.66675C2.15297 9.06394 2.06477 9.46536 2 9.86901M2.03457 13.5381C2.10487 13.9381 2.19644 14.3343 2.30852 14.7245M3.83292 17.9963C4.07124 18.3497 4.3296 18.69 4.6071 19.0147M7.42857 21.3607C7.78228 21.5632 8.15042 21.7464 8.53228 21.9084", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function RotateCw({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(RotateCwPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const SearchPaths = [
  ["path", { d: "M17 17L21 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Search({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(SearchPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const SlidersPaths = [
  ["path", { d: "M3 10.5409V13.4591C3 15.1684 3 16.0231 3.41439 16.7223C3.82877 17.4216 4.58123 17.8366 6.08614 18.6667L9.08614 20.3215C10.5105 21.1072 11.2226 21.5 12 21.5C12.7774 21.5 13.4895 21.1072 14.9139 20.3215L17.9139 18.6667C19.4188 17.8366 20.1712 17.4216 20.5856 16.7223C21 16.0231 21 15.1684 21 13.4591V10.5409C21 8.83158 21 7.97693 20.5856 7.27769C20.1712 6.57845 19.4188 6.16339 17.9139 5.33328L14.9139 3.67848C13.4895 2.89283 12.7774 2.5 12 2.5C11.2226 2.5 10.5105 2.89283 9.08614 3.67848L6.08614 5.33328C4.58123 6.16339 3.82877 6.57845 3.41439 7.27769C3 7.97693 3 8.83158 3 10.5409Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];
export function Sliders({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(SlidersPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const SmartphonePaths = [
  ["path", { d: "M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Smartphone({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(SmartphonePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const SparklesPaths = [
  ["path", { d: "M9.85267 4.8654L8.7579 8.69741C8.47317 9.69406 7.69412 10.4731 6.69747 10.7579L2.86538 11.8528C2.35315 11.9991 2 12.4673 2 13C2 13.5327 2.35315 14.0009 2.86538 14.1472L6.69747 15.2421C7.69412 15.5269 8.47317 16.3059 8.7579 17.3026L9.85267 21.1346C9.99902 21.6468 10.4672 22 10.9999 22C11.5327 22 12.0008 21.6469 12.1472 21.1347L13.2422 17.3025C13.527 16.3059 14.306 15.5269 15.3026 15.2421L19.1346 14.1473C19.6468 14.0009 20 13.5327 20 13C20 12.4673 19.6468 11.9991 19.1346 11.8527L15.3026 10.7579C14.306 10.4731 13.527 9.69411 13.2422 8.69753L12.1472 4.86535C12.0008 4.35313 11.5327 4 10.9999 4C10.4672 4 9.99902 4.35316 9.85267 4.8654Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19.5 2.9375V4.5M19.5 4.5V6.0625M19.5 4.5H18.25M19.5 4.5H20.75M22 4.5L20.9156 4.13852C20.4179 3.97263 20.0274 3.58211 19.8615 3.08443L19.5 2L19.1385 3.08443C18.9726 3.58211 18.5821 3.97263 18.0844 4.13852L17 4.5L18.0844 4.86148C18.5821 5.02737 18.9726 5.41789 19.1385 5.91557L19.5 7L19.8615 5.91557C20.0274 5.41789 20.4179 5.02737 20.9156 4.86148L22 4.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Sparkles({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(SparklesPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const SquarePaths = [
  ["path", { d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }]
];
export function Square({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(SquarePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const TabletPaths = [
  ["path", { d: "M14.5 2H9.5C6.67157 2 5.25736 2 4.37868 2.87868C3.5 3.75736 3.5 5.17157 3.5 8V16C3.5 18.8284 3.5 20.2426 4.37868 21.1213C5.25736 22 6.67157 22 9.5 22H14.5C17.3284 22 18.7426 22 19.6213 21.1213C20.5 20.2426 20.5 18.8284 20.5 16V8C20.5 5.17157 20.5 3.75736 19.6213 2.87868C18.7426 2 17.3284 2 14.5 2Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Tablet({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(TabletPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const TagPaths = [
  ["path", { d: "M8 2H9.01472C10.241 2 10.8541 2 11.4054 2.22836C11.9567 2.45672 12.3903 2.89027 13.2574 3.75736L21.1262 11.6263C21.6841 12.1867 21.9982 12.9449 22 13.7357L22 13.75L22 13.7643C21.9982 14.5551 21.6841 15.3133 21.1262 15.8737L15.8737 21.1262C15.3133 21.6841 14.5551 21.9982 13.7643 22L13.75 22L13.7357 22C12.9449 21.9982 12.1867 21.6841 11.6263 21.1262L3.75736 13.2574C2.89027 12.3903 2.45672 11.9567 2.22836 11.4054C2 10.8541 2 10.241 2 9.01472V8C2 5.17157 2 3.75736 2.87868 2.87868C3.75736 2 5.17157 2 8 2Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7.5 7.25V7.5M8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Tag({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(TagPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const Trash2Paths = [
  ["path", { d: "M18.8516 16.3743L19.5 6H4.5L5.14839 16.3743C5.315 19.0401 5.39831 20.373 6.26426 21.1865C7.13021 22 8.46571 22 11.1367 22H12.8633C15.5343 22 16.8698 22 17.7357 21.1865C18.6017 20.373 18.685 19.0401 18.8516 16.3743Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16 6H21M16 6L15.3778 4.34082C15.0007 3.33524 14.8122 2.83245 14.4402 2.50292C14.3213 2.39765 14.1904 2.3069 14.0501 2.2326C13.6109 2 13.074 2 12 2C10.926 2 10.3891 2 9.9499 2.2326C9.8096 2.3069 9.67865 2.39765 9.55982 2.50292C9.18783 2.83245 8.99928 3.33524 8.62219 4.34082L8 6M16 6H8M3 6H8", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M9.5 11V17M14.5 11V17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function Trash2({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(Trash2Paths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const TypePaths = [
  ["path", { d: "M15 21.001H9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 3.00001V21.0008M12 3.00001C13.3874 3.00001 15.1695 3.03055 16.5884 3.17649C17.1885 3.2382 17.4886 3.26906 17.7541 3.37791C18.3066 3.60429 18.7518 4.10063 18.9194 4.67681C19 4.95382 19 5.26992 19 5.90215M12 3.00001C10.6126 3.00001 8.83047 3.03055 7.41161 3.17649C6.8115 3.2382 6.51144 3.26906 6.24586 3.37791C5.69344 3.60429 5.24816 4.10063 5.08057 4.67681C5 4.95382 5 5.26992 5 5.90215", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
export function Type({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(TypePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const UndoPaths = [
  ["path", { d: "M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.66873 3 5.76018 4.80989 4.20404 7.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 3V4.27816C3 6.47004 3 7.56599 3.70725 8.16512C4.4145 8.76425 5.49553 8.58408 7.6576 8.22373L9 8", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Undo({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(UndoPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const XPaths = [
  ["path", { d: "M18.9991 19L5 5.00098", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19 5L5.00092 18.999", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function X({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(XPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const ZoomInPaths = [
  ["path", { d: "M18.5016 19.1217L21 21.6217M20 15.1217C20 12.0842 17.5376 9.62173 14.5 9.62173C11.4624 9.62173 9 12.0842 9 15.1217C9 18.1593 11.4624 20.6217 14.5 20.6217C17.5376 20.6217 20 18.1593 20 15.1217Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14.5 13.1217V17.1217M16.5 15.1217H12.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M10 3.62173H14M3 10.6217V14.6217M6.5 21.6217C4.567 21.6217 3 20.0547 3 18.1217M17.5 3.62173C19.433 3.62173 21 5.18873 21 7.12173M3 7.12173C3 5.18873 4.567 3.62173 6.5 3.62173", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function ZoomIn({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(ZoomInPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }
const ZoomOutPaths = [
  ["path", { d: "M18.5016 18.5L21 21M20 14.5C20 11.4624 17.5376 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 17.5376 11.4624 20 14.5 20C17.5376 20 20 17.5376 20 14.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16.5 14.5H12.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M10 3H14M3 10V14M6.5 21C4.567 21 3 19.433 3 17.5M17.5 3C19.433 3 21 4.567 21 6.5M3 6.5C3 4.567 4.567 3 6.5 3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
export function ZoomOut({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(ZoomOutPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }

const MinimizePaths = [
  ["path", { d: "M13 4L13 7.00002C13 8.88563 13.0001 9.82843 13.5858 10.4142C14.1716 11 15.1144 11 17 11L20 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.0001 20L11 17C11 15.1144 11 14.1715 10.4142 13.5858C9.82843 13 8.88563 13 7.00002 13L4.00006 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
export function Minimize({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(MinimizePaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }

const HandPaths = [
  ["path", { d: "M18.5 11.5V8.75C18.5 7.7835 19.2835 7 20.25 7C21.2165 7 22 7.7835 22 8.75V14.8C22 18.7765 18.7764 22 14.8 22H12.0588M8 14L5.61507 11.2176C5.22468 10.7621 4.65476 10.5 4.05489 10.5H3.91898C2.85916 10.5 2 11.3592 2 12.419C2 12.7978 2.11214 13.1682 2.32229 13.4834L5.7812 18.6718C7.16738 20.7511 9.50102 22 12 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18.5 8.5V5.75C18.5 4.7835 17.7165 4 16.75 4C15.7835 4 15 4.7835 15 5.75V10.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M15 10.5V3.75C15 2.7835 14.2165 2 13.25 2C12.2835 2 11.5 2.7835 11.5 3.75V10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M11.5 10V5.75C11.5 4.7835 10.7165 4 9.75 4C8.7835 4 8 4.7835 8 5.75V14", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
export function Hand({size=20,...props}: Props) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{(HandPaths as any).map(([tag, attrs]: any)=>React.createElement(tag,attrs))}</svg>; }

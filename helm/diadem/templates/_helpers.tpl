{{/*
Expand the name of the chart.
*/}}
{{- define "diadem.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "diadem.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "diadem.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "diadem.labels" -}}
helm.sh/chart: {{ include "diadem.chart" . }}
{{ include "diadem.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "diadem.selectorLabels" -}}
app.kubernetes.io/name: {{ include "diadem.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Generate the database configuration block for config.toml
*/}}
{{- define "diadem.dbConfig" -}}
[server.db]
host = "{{ .Values.database.external.host }}"
port = {{ .Values.database.external.port }}
database = "{{ .Values.database.external.database }}"
user = "{{ .Values.database.external.user }}"
password = "{{ .Values.database.external.password }}"

[server.internalDb]
host = "{{ .Values.database.internal.host }}"
port = {{ .Values.database.internal.port }}
database = "{{ .Values.database.internal.database }}"
user = "{{ .Values.database.internal.user }}"
password = "{{ .Values.database.internal.password }}"
{{- end }}

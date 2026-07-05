import { useState } from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}
export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="field" style={{ marginBlock: 12 }}>
      <label>{label}</label>
      {children}
      {hint && <span className="mono text-muted" style={{ marginTop: 2 }}>{hint}</span>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input" {...props} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="textarea" {...props} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  const { options, ...rest } = props;
  return (
    <select className="select" {...rest}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

interface ChoiceProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

export function ChoiceGroup<T extends string>({ options, value, onChange }: ChoiceProps<T>) {
  return (
    <div className="row wrap gap-2" style={{ marginTop: 6 }}>
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          className="tag"
          onClick={() => onChange(o.value)}
          style={{
            background: value === o.value ? 'var(--ink)' : 'transparent',
            color: value === o.value ? 'var(--paper)' : 'var(--ink)',
            borderColor: value === o.value ? 'var(--ink)' : 'var(--hairline-strong)',
            padding: '8px 12px',
          }}
        >{o.label}</button>
      ))}
    </div>
  );
}

export function UploadImage({ label, onImage, preview }: {
  label?: string;
  /** Called with a downscaled data URL + aspect ratio when a real image is picked. */
  onImage?: (dataUrl: string, ratio: number) => void;
  /** Currently selected image (controlled preview), shown inside the dropzone. */
  preview?: string | null;
}) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className="col gap-3">
      <label className="mono text-muted" style={{ fontSize: 10 }}>{label ?? 'Upload image'}</label>
      <div
        style={{
          border: '1px dashed var(--hairline-strong)',
          padding: preview ? 12 : '32px 20px',
          background: 'var(--paper-warm)',
          textAlign: 'center',
        }}
      >
        {preview ? (
          <img src={preview} alt="" style={{ width: '100%', maxHeight: 320, objectFit: 'contain', display: 'block', borderRadius: 8 }} />
        ) : (
          <div className="mono text-muted" style={{ marginBottom: 12 }}>Drag images or</div>
        )}
        <label className="btn btn-sm" style={{ cursor: 'pointer', marginTop: preview ? 12 : 0 }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={async (e) => {
              const list = e.target.files;
              if (!list || list.length === 0) return;
              const file = list[0];
              setFiles([file.name]);
              if (onImage) {
                const { fileToUpload } = await import('../data/uploads');
                try {
                  const { dataUrl, ratio } = await fileToUpload(file);
                  onImage(dataUrl, ratio);
                } catch { /* unreadable file — keep the dropzone as-is */ }
              }
            }}
          />
          {preview ? 'Replace image' : 'Select image'}
        </label>
        {!preview && files.length > 0 && (
          <div className="row wrap gap-2 center-text" style={{ justifyContent: 'center', marginTop: 16 }}>
            {files.map((f, i) => <span key={i} className="tag tag-soft">{f}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

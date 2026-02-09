import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { ConversionSettings } from '@/types/pdf';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onSettingsChange: (settings: Partial<ConversionSettings>) => void;
  disabled?: boolean;
}

export function SettingsPanel({
  settings,
  onSettingsChange,
  disabled = false,
}: SettingsPanelProps) {
  const scaleLabels: Record<number, string> = {
    1: 'Low (72 DPI)',
    1.5: 'Medium (108 DPI)',
    2: 'High (144 DPI)',
    2.5: 'Very High (180 DPI)',
    3: 'Ultra (216 DPI)',
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled}>
          <Settings2 className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Export Settings</h3>
            <p className="text-xs text-muted-foreground">
              Configure image output quality and format
            </p>
          </div>

          {/* Format */}
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={settings.format}
              onValueChange={(value: 'png' | 'jpeg') => 
                onSettingsChange({ format: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (Lossless)</SelectItem>
                <SelectItem value="jpeg">JPEG (Smaller)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality (JPEG only) */}
          {settings.format === 'jpeg' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Quality</Label>
                <span className="text-sm text-muted-foreground">
                  {Math.round(settings.quality * 100)}%
                </span>
              </div>
              <Slider
                value={[settings.quality]}
                onValueChange={([value]) => onSettingsChange({ quality: value })}
                min={0.1}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          )}

          {/* Scale / DPI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Resolution</Label>
              <span className="text-sm text-muted-foreground">
                {scaleLabels[settings.scale] || `${settings.scale}x`}
              </span>
            </div>
            <Slider
              value={[settings.scale]}
              onValueChange={([value]) => onSettingsChange({ scale: value })}
              min={1}
              max={3}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

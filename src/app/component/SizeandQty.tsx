import { Card } from '@/components/ui/card'
import React from 'react'

export default function SizeandQty() {
  return (
    <Card>
        <div>
          <label>Size</label>
          <select>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" min="1" max="10" />
        </div>
    </Card>
  )
}

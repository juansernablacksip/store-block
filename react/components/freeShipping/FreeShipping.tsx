import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Progress } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { FreeShippingProps } from '../../typings/free-shipping'


/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
    "fs_globalFreeShippingContainer",
    "fs_informativeFreeShippingText",
    "fs_freeShippingProgressBar",
    "fs_rangeFreeShippingContainer",
    "fs_initialRangeFreeShippingText",
    "fs_endRangeFreeShippingText"
] as const


const FreeShipping: StorefrontFunctionComponent<FreeShippingProps> = ({ valueOfFreeShipping, infoLabel, show }) => {

    // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
    const { orderForm: { totalizers } } = useOrderForm()
    let subTotal = totalizers.length === 0 ? 0 : totalizers[0].value

    const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)
    const [percentageForFreeShipping, setPercentageForFreeShipping] = useState(1)

    useEffect(() => {
        setMissingForFreeShipping(valueOfFreeShipping - subTotal <= 0 ? 0 : valueOfFreeShipping - subTotal)
        setPercentageForFreeShipping((subTotal * 100) /valueOfFreeShipping > 100 ? 100 : (subTotal * 100) /valueOfFreeShipping)
    }, [subTotal])

    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div className = {`w-90 pa3 ${handles.fs_globalFreeShippingContainer}`}>
            {show.informativeFreeShippingText &&
                <p className = {`t-body mw9 mw-100 ${handles.fs_informativeFreeShippingText}`}> 
                    {show.labelInitial &&
                        infoLabel.labelInitial 
                    }
                    {show.subTotal &&
                        <FormattedCurrency value = {subTotal} /> 
                    }
                    &nbsp;
                    {show.labelBetween &&
                        infoLabel.labelBetween
                    } 
                    {show.missingForFreeShipping &&
                        <FormattedCurrency value = {missingForFreeShipping} /> 
                    }
                    &nbsp;
                    {show.labelFinal && 
                        infoLabel.labelFinal
                    }
                    &nbsp;
                </p>
            }
            {show.rangeFreeShipping &&
                <div className = {`flex flex-wrap items-center justify-between pa2 ${handles.fs_rangeFreeShippingContainer}`}>
                    {show.percentageFreeShipping &&
                        <Progress type = "line" percent = {percentageForFreeShipping}  className = {`mw-100 ${handles.fs_freeShippingProgressBar}`}/>
                    }
                    <p className = {`t-body mw9 self-start ${handles.fs_initialRangeFreeShippingText}`}> <FormattedCurrency value = {0} /> </p>
                    <p className = {`t-body mw9 self-end ${handles.fs_endRangeFreeShippingText}`}> <FormattedCurrency value = {valueOfFreeShipping} /> </p>
                </div>
            }
        </div>
    )
}


FreeShipping.defaultProps = {
    valueOfFreeShipping: 1,
    infoLabel: {
        labelInitial: "Valor actual:",
        labelBetween: "¡Faltan ",
        labelFinal: "para que su envío sea totalmente gratis!"
    },
    show: {
        informativeFreeShippingText: true,
        percentageFreeShipping: true,
        rangeFreeShipping: true,
        labelInitial: true,
        subTotal: true,
        labelBetween: true,
        missingForFreeShipping: true,
        labelFinal: true
    }
}


FreeShipping.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    valueOfFreeShipping: {
        title: "editor.countdown.valueOfFreeShipping.title",
        type: "number"
    },
    infoLabel: {
        title: "",
        type: "object",
        properties: {
            labelInitial: {
                title: "editor.countdown.infoLabel.labelInitial.title",
                type: "string"
            },
            labelBetween: {
                title: "editor.countdown.infoLabel.labelBetween.title",
                type: "string"
            },
            labelFinal: {
                title: "editor.countdown.infoLabel.labelFinal.title",
                type: "string"
            }
        }
    }
  }
}

export default FreeShipping
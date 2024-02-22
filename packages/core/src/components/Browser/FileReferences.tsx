import type { SanityDocument } from '@sanity/client'
import { Box, Card, Text, useTheme } from '@sanity/ui'
import React from 'react'
import { collate, useSchema } from 'sanity'
import styled from 'styled-components'
import SpinnerBox from '../SpinnerBox'
import { DocumentPreview } from '../documentPreview/DocumentPreview'

const Container = styled(Box)`
  * {
    color: ${(props: any) => {
      return props.theme.sanity.color.base.fg
    }}
  a {
    text-decoration: none;
  }
  h2 {
    font-size: ${(props: any) => props.theme.sanity.fonts.text.sizes[1]};
  }
`

const FileReferences: React.FC<{
  fileId: string
  references?: SanityDocument[]
  isLoaded: boolean
  placement: 'input' | 'tool'
}> = (props) => {
  const schema = useSchema()
  const theme = useTheme()
  if (!props.isLoaded) {
    return <SpinnerBox />
  }

  if (!props.references?.length) {
    return (
      <Text
        size={2}
        weight="bold"
        muted
        style={{ marginTop: '1.5rem', textAlign: 'center' }}
      >
        No documents are using this file
      </Text>
    )
  }

  const documentPairs = collate(props.references || [])
  return (
    <Container theme={theme}>
      {documentPairs?.map((documentPair) => {
        const schemaType = schema.get(documentPair.type)

        return (
          <Card
            key={documentPair.id}
            marginBottom={2}
            padding={2}
            radius={2}
            shadow={1}
            style={{ overflow: 'hidden' }}
          >
            <Box>
              <DocumentPreview
                documentPair={documentPair}
                schemaType={schemaType}
                placement={props.placement}
              />
            </Box>
          </Card>
        )
      })}
    </Container>
  )
}

export default FileReferences
